
const LONG_EXPOSURE_FLAVOR = "LongExposure"

var sourceSettings = { }

let outputIsVideo = mediaComponentType == 'Video'
let outputIsImage = mediaComponentType == 'Image'


var rawAdjustment = composition.raw
if (rawAdjustment) {
	sourceSettings['inputDecoderVersion'] = rawAdjustment.inputDecoderVersion
	var sushiLevel = rawAdjustment.inputSushiLevel
	if (sushiLevel) {
		sourceSettings['kCGImageSourceShouldExtendRaw'] = sushiLevel
	}
}

var rawNoiseReduction = composition.rawNoiseReduction
if (rawNoiseReduction && rawNoiseReduction.enabled) {
	sourceSettings['inputNoiseReductionDetailAmount'] = rawNoiseReduction.detail
	sourceSettings['inputUIColorNoiseReductionAmount'] = rawNoiseReduction.color
	sourceSettings['inputUILuminanceNoiseReductionAmount'] = rawNoiseReduction.luminance
	sourceSettings['inputNoiseReductionSharpnessAmount'] = rawNoiseReduction.sharpness
	sourceSettings['inputNoiseReductionContrastAmount'] = rawNoiseReduction.contrast
}

let whiteBalance = composition.whiteBalance
if (rawAdjustment && whiteBalance && whiteBalance.enabled && whiteBalance.colorType == 'tempTint') {
	sourceSettings['inputNeutralTemperature'] = whiteBalance.temperature
	sourceSettings['inputNeutralTint'] = whiteBalance.tint
}


var frameTime

let autoLoop = composition.autoLoop

let sourceMediaType = composition.source.mediaType
let livePhotoKeyFrame = (autoLoop && autoLoop.enabled) ? null : composition.livePhotoKeyFrame
let videoPosterFrame = composition.videoPosterFrame
let videoTrim = composition.trim

if (outputIsImage && (sourceMediaType == "LivePhoto" || sourceMediaType == "Video")) {
    if (PipelineStateHasStaticTime()) {
        sourceSettings['mediaComponentType'] = "Video"
        sourceSettings['hardCropCleanAperture'] = true

    } else if (sourceMediaType == "LivePhoto") {
        if (livePhotoKeyFrame) {
            frameTime = TimeMake(livePhotoKeyFrame.time, livePhotoKeyFrame.scale)
            sourceSettings['defaultFrameTime'] = frameTime
            sourceSettings['mediaComponentType'] = "Video"
            sourceSettings['hardCropCleanAperture'] = true
        } else {
            if (autoLoop && autoLoop.enabled) {
                let flavor = autoLoop.flavor
                if (flavor != LONG_EXPOSURE_FLAVOR) {
                    if (videoTrim && videoTrim.enabled) {
                        frameTime = TimeMake(videoTrim.start, videoTrim.startScale)
                    } else {
                        frameTime = TimeMake(0, 60)
                    }
                    sourceSettings['defaultFrameTime'] = frameTime
                    sourceSettings['mediaComponentType'] = "Video"
                    
                } else {
                }
            } else {
            }
        }

    } else if (sourceMediaType == "Video") {
        if (videoPosterFrame) {
            frameTime = TimeMake(videoPosterFrame.time, videoPosterFrame.scale)
        } else {
            if (videoTrim && videoTrim.enabled) {
                frameTime = TimeMake(videoTrim.start, videoTrim.startScale)
            } else {
                frameTime = TimeMake(0, 60)
            }
        }

        sourceSettings['defaultFrameTime'] = frameTime
        sourceSettings['mediaComponentType'] = "Video"
        sourceSettings['hardCropCleanAperture'] = true
    }
    
} else if ((sourceMediaType == "LivePhoto" || sourceMediaType == "Video")) {
    
    if (composition.cropStraighten || composition.videoReframe) {
        if (autoLoop && autoLoop.enabled) {
        } else if (sourceMediaType == "LivePhoto") {
            sourceSettings['hardCropCleanAperture'] = false
        } else {
            sourceSettings['hardCropCleanAperture'] = true
        }
    }
    
    if (livePhotoKeyFrame) {
        frameTime = TimeMake(livePhotoKeyFrame.time, livePhotoKeyFrame.scale)
    } else if (videoPosterFrame) {
        frameTime = TimeMake(videoPosterFrame.time, videoPosterFrame.scale)
    }
}

let projectDirtyApertureInCrop = false
if (sourceMediaType == "LivePhoto") {
    if (livePhotoKeyFrame || (autoLoop && autoLoop.enabled)) {
        
    } else if (outputIsVideo || sourceSettings['mediaComponentType'] == "Video") {
        
        projectDirtyApertureInCrop = true
    }
}

var canPerformLocalAdjustments = outputIsImage
if (autoLoop && autoLoop.enabled) {
	autoLoopRecipe = autoLoop.recipe
	let flavor = autoLoop.flavor
	
	if (flavor != LONG_EXPOSURE_FLAVOR) {
		canPerformLocalAdjustments = false
	}
	sourceSettings['mediaComponentType'] = "Video"
}

sourceSettings['skipOrientation'] = true


BeginGroup("Master")

var image;

var moveFrameToOriginTransform
var restoreFrameFromOriginTransform

var sourceSelect = composition.sourceSelect;
var usingSecondarySource = false
let primaryGeometry = null
let overcaptureGeometry = null
if (sourceSelect == null || sourceSelect.inputImage == "primary") {
    
    image =  Source(composition.source, sourceSettings)

} else if( sourceSelect.inputImage == "spatialOvercapture") {
    
    image =  Source(composition.sourceSpatialOvercapture, sourceSettings)
    usingSecondarySource = true
    
} else if( sourceSelect.inputImage == "spatialOvercaptureFused") {
    
    image =  Source(composition.sourceSpatialOvercapture, sourceSettings)
    usingSecondarySource = true
	
	overcaptureGeometry = image.geometry

    if ( composition.source != null ){
        
        
        primaryGeometry = Source(composition.source, sourceSettings).geometry
        
        let primWidth = primaryGeometry.size.width;
        let primHeight = primaryGeometry.size.height;
        let imageWidth = image.geometry.size.width;
        let imageHeight = image.geometry.size.height;
        
        let transX = (imageWidth - primWidth) / 2;
        let transY = (imageHeight - primHeight) / 2;
        
        moveFrameToOriginTransform = AffineTransformMake(1, 0, 0, 1, transX, transY)
        restoreFrameFromOriginTransform = AffineTransformMake(1, 0, 0, 1, -transX, -transY)

        image = Transform(image,restoreFrameFromOriginTransform);
    }
} else {
    throw "unsupported sourceSelect adjustment";
}

var rawImage = GetTagInput('RAW/Linear')
if (rawImage) {
	rawImage = AddTag('Source', rawImage)
} else {
	image = AddTag('Source', image)
}

EndGroup("Master")

image = AddTag('pre-AutoLoop', image)
if (autoLoop && autoLoop.enabled)
{
    if (moveFrameToOriginTransform) {
        image = Transform(image, moveFrameToOriginTransform)
    }

    var settings = { "flavor": autoLoop.flavor, "recipe": autoLoop.recipe }
    if (videoTrim && videoTrim.enabled) {
        settings['trim'] = { "start" : videoTrim.start, "end" : videoTrim.end, "startScale" : videoTrim.startScale, "endScale" : videoTrim.endScale }
    }
    image = Cache(image, "AutoLoop", settings);
    
    if (autoLoop.flavor == LONG_EXPOSURE_FLAVOR && outputIsImage) {
        let highResFusion = composition.highResFusion;
        if (highResFusion && highResFusion.enabled) {
            image = performLongExposureFusion(highResFusion, image);
        } else {
            image = Scale(image, ScaleMake(1,1))
        }
    }

    if (moveFrameToOriginTransform && primaryGeometry && overcaptureGeometry) {
		
        let stabilizeInstructions = autoLoop.recipe["NormStabilizeInstructions"]
        if (stabilizeInstructions) {
			let overcaptureVideoComplementSettings = sourceSettings
			overcaptureVideoComplementSettings['mediaComponentType'] = "Video"

			let overcaptureVideoComplement = Source(composition.sourceSpatialOvercapture, overcaptureVideoComplementSettings)
			
            let stabCropRect = stabilizeInstructions["stabCropRect"]
			let stabCropRectAsCGRect = { 'x':stabCropRect["X"], 'y':stabCropRect["Y"], 'width':stabCropRect["Width"], 'height':stabCropRect["Height"] }
			
			let overcaptureRectInPrimarySpace =  OvercaptureRectForAutoCrop(overcaptureGeometry.size, overcaptureVideoComplement.geometry.scaledSize, primaryGeometry.size, stabCropRectAsCGRect)

            moveFrameToOriginTransform = AffineTransformMake(1, 0, 0, 1, -overcaptureRectInPrimarySpace.x, -overcaptureRectInPrimarySpace.y)
			
            restoreFrameFromOriginTransform = AffineTransformMake(1, 0, 0, 1, overcaptureRectInPrimarySpace.x, overcaptureRectInPrimarySpace.y)
        }
    }
    
    if (restoreFrameFromOriginTransform) {
        image = Transform(image, restoreFrameFromOriginTransform)
    }
}

if (frameTime && outputIsImage) {
    image = PipelineStateSettings(image, {
                                  "defaultFrameTime" : frameTime,
                                  "mediaComponentType" : "Video"
                                  })
}

image = AddTag('ShowOriginalSource', image)

var rawOutput = image

if (rawImage) {
	image = rawImage
	
	image = Filter("PIForwardFakeBoost", {
				   "inputImage" : image,
                   "inputBoost" : 1.0,
				   })
}

image = AddTag('pre-Adjustments', image)

let unadjustedImage = image;
let cacheAlways = false;

if (canPerformLocalAdjustments) {
    let retouch = composition.retouch
    if (retouch && retouch.enabled) {
        cacheAlways = true;
		image = Cache(image, "Retouch", {"retouch": retouch})
    }
	
	var apertureRedEye = composition.apertureRedEye
	if (apertureRedEye && apertureRedEye.enabled) {
        cacheAlways = true;
		image = performApertureRedEye(apertureRedEye, image);
	}

    let redEye = composition.redEye
    if (redEye && redEye.enabled) {
        cacheAlways = true;
        image = performRedEye(redEye, image);
    }
}


let depthImage = null
let matteImage = null
let skinSegMatteImage = null
let hairSegMatteImage = null
let teethSegMatteImage = null
let depthEffect = composition.depthEffect
let effect3D = composition.effect3D
let portraitEffect = composition.portraitEffect
let depthEffectEnabled = depthEffect && depthEffect.enabled
let effect3DEnabled = effect3D && effect3D.enabled
let portraitEffectEnabled = portraitEffect && portraitEffect.enabled

if (outputIsImage && !portraitEffectEnabled) {
    image = Cache(image, "Intermediate", { "cacheAlways" : cacheAlways });
}

if (depthEffectEnabled || effect3DEnabled || portraitEffectEnabled) {

    let depthSettings = { auxiliaryImageType: "Disparity", skipOrientation: true, nativeScale: true }
    if (SourceIsAvailable(composition.source, depthSettings)) {
        depthImage = Source(composition.source, depthSettings)
        depthImageExtent = depthImage.geometry.extent
        depthImage = Crop(depthImage, depthImageExtent.x, depthImageExtent.y, depthImageExtent.width, depthImageExtent.height)
    }

    var portraitKindNeedsDepth = portraitEffect && (portraitEffect.kind === "Black" || portraitEffect.kind === "BlackoutMono");
    if (!depthImage && (depthEffectEnabled || (portraitEffectEnabled && portraitKindNeedsDepth))) {
        throw "Source does not contain depth"
    }

    matteImage = getCroppedAuxillaryImage("PortraitEffectsMatte");
    
    if (portraitEffectEnabled && getPortraitEffectVersion(portraitEffect) == 2){
        skinSegMatteImage = getCroppedAuxillaryImage("SkinSegmentationMatte");
        hairSegMatteImage = getCroppedAuxillaryImage("HairSegmentationMatte");
        teethSegMatteImage = getCroppedAuxillaryImage("TeethSegmentationMatte");
    }
}

let depthSettings = null;
if (depthEffect) {
    let info = depthEffect.depthInfo
    let focusRect = info.focusRect
    let faces = info.faces

    depthSettings = {
        "inputAperture": depthEffect.aperture != null ? depthEffect.aperture : 4.5,
    }

    if (focusRect) {
        depthSettings.inputFocusRect = CIVectorMake(focusRect.x, focusRect.y, focusRect.w, focusRect.h);
    }

    if (faces) {
        let leftEyes = [];
        let rightEyes = [];
        let noses = [];
        let chins = [];

        for (let i = 0; i < faces.length; ++i) {
            let face = faces[i];
            leftEyes.push(face.leftEyeX, face.leftEyeY);
            rightEyes.push(face.rightEyeX, face.rightEyeY);
            noses.push(face.noseX, face.noseY);

            if (face.chinX && face.chinY) {
                chins.push(face.chinX, face.chinY);
            }
        }

        depthSettings.inputLeftEyePosition = CIVectorMake(leftEyes);
        depthSettings.inputRightEyePosition = CIVectorMake(rightEyes);
        depthSettings.inputFaceMidPoint = CIVectorMake(noses);
        depthSettings.inputChinPosition = CIVectorMake(chins);
    }
}

let blurMap = null
let gammaBlurMap = null

if ((effect3DEnabled || portraitEffectEnabled || depthEffectEnabled) && depthImage) {
    if (!depthSettings) {
        if (portraitEffectEnabled || depthEffectEnabled) {
            throw "Missing required depth settings";
        }
    }
    
    if (depthSettings) {
        let settings = Object.create(depthSettings);
        settings.__dominantInputSettingsKey = "inputImage";
        settings.inputImage = unadjustedImage;
        settings.inputShiftmapImage = depthImage;

        let depthProperties = depthImage.imageProperties.depthProperties;
        settings.inputCalibrationData = depthProperties.cameraCalibrationData;
        settings.inputAuxDataMetadata = depthProperties.depthMetaData;
        settings.inputScale = Function({ }, function () { return scale.toDouble(); })
        
        let size = image.geometry.size
        settings.inputOriginalSize = CIVectorMake(size.width, size.height)
        
        if (matteImage && FilterAvailable("CIDepthEffectMakeBlurMap", "inputMatteImage")) {
            settings.inputMatteImage = matteImage;
        }
        
        if (hairSegMatteImage && FilterAvailable("CIDepthEffectMakeBlurMap", "inputHairImage")) {
            settings.inputHairImage = hairSegMatteImage;
        }
        
        blurMap = Filter("CIDepthEffectMakeBlurMap", settings)
        
        
        gammaBlurMap = Filter("CIGammaAdjust", {
                              "inputImage": blurMap,
                              "inputPower": 2.0
                              })
    }
}

if (outputIsImage && portraitEffectEnabled) {
    
    let portraitVersion = getPortraitEffectVersion(portraitEffect);

    let faceLandmarks = portraitEffect.portraitInfo.faceLandmarks;
    
    let filterArgs = {
        "inputImage": image,
        "inputFaceLandmarkArray": faceLandmarks,
        "inputScale": Function({ }, function () { return scale.toDouble() }),
        "__dominantInputSettingsKey": "inputImage",
    }
    
    if (portraitVersion == 2){
        filterArgs["inputDisparity"] = depthImage
        filterArgs["inputMatte"] = matteImage
        filterArgs["inputBlurMap"] = blurMap
        filterArgs["inputFaceMask"] = skinSegMatteImage
        filterArgs["inputHairMask"] = hairSegMatteImage
        filterArgs["inputTeethMask"] = teethSegMatteImage
        
    } else {
        
        if (portraitEffect.kind == "Black" || (portraitEffect.kind == "BlackoutMono")) {
            
            filterArgs["inputDisparity"] = depthImage
            filterArgs["inputFullSizeImage"] = ResetScale(image, ScaleMake(1,1))
            filterArgs["inputMatte"] = matteImage
            
        } else if (portraitEffect.kind != "Light") {
            filterArgs["inputDepthMap"] = gammaBlurMap
        }
    }
    
    
    if (portraitVersion == 2){
        
        let imageZero;
        filterArgs["inputStrength"] = 0.0
        imageZero = Filter("CIPortraitEffect" + portraitEffect.kind, filterArgs)
        imageZero = Cache(imageZero, "Intermediate", { "cacheAlways" : true })
        
        let imageFull;
        filterArgs["inputStrength"] = 1.0
        imageFull = Filter("CIPortraitEffect" + portraitEffect.kind, filterArgs)
        imageFull = Cache(imageFull, "Intermediate", { "cacheAlways" : true })
        
        let rawPortraitStrength = portraitEffect.strength != null ? portraitEffect.strength : 0.5;
        
        let remappedPortraitStrength;
        
        if (portraitEffect.kind == "StudioV2") {
            remappedPortraitStrength = Math.pow(rawPortraitStrength, 0.75);
        } else if (portraitEffect.kind == "ContourV2") {
            remappedPortraitStrength = -.8 * Math.pow(rawPortraitStrength, 2) + 1.8 * rawPortraitStrength;
        } else {
            remappedPortraitStrength = rawPortraitStrength;
        }
        
        image = Filter("CIMix", {
                       inputImage : imageFull,
                       inputBackgroundImage : imageZero,
                       inputAmount : remappedPortraitStrength,
                       "__dominantInputSettingsKey": "inputImage",
                       });
        
    } else {
        image = Filter("CIPortraitEffect" + portraitEffect.kind, filterArgs)
        
        image = Cache(image, "Intermediate", { "cacheAlways" : true });
    }
}

if (outputIsImage && depthEffectEnabled) {
    let info = depthEffect.depthInfo
    
    
    let finiteImage = image
    if (moveFrameToOriginTransform) {
        finiteImage = Transform(finiteImage, moveFrameToOriginTransform)
    }

    let fullExtent = finiteImage.geometry.extent;
    finiteImage = Crop(finiteImage, fullExtent.x, fullExtent.y, fullExtent.width, fullExtent.height);

    if (restoreFrameFromOriginTransform) {
        finiteImage = Transform(finiteImage, restoreFrameFromOriginTransform)
    }

    let depthProperties = depthImage.imageProperties.depthProperties;
    let settings = {
        "inputImage" : finiteImage,
        "__dominantInputSettingsKey" : "inputImage",
        "inputBlurMap" : blurMap,
        "inputLumaNoiseScale" : info.lumaNoiseScale,
        "inputScale" : Function({ }, function () { return scale.toDouble(); }),
        "inputShape" : info.shape,
        "inputAuxDataMetadata" : depthProperties.depthMetaData,
    };

    if (depthEffect && FilterAvailable("CIDepthEffectApplyBlurMap", "inputAperture")) {
        settings["inputAperture"] = depthEffect.aperture
    }

    if (matteImage) {
        settings.inputMatteImage = matteImage;
    }

    image = Filter("CIDepthEffectApplyBlurMap", settings);
}


image = AddTag('masterSpace', image)
let localLightGuideImage = image;

var noiseReduction = composition.noiseReduction
if (noiseReduction && noiseReduction.enabled) {
    
    let nrRadius = noiseReduction.radius
    if (outputIsVideo) {
        nrRadius = nrRadius * 0.5;
    }
	image = Filter("PIBilateralFilter", {
				   inputImage : image,
				   inputRadius : Function({ radius: nrRadius }, function () { return scale.toDouble() * radius }),
                   inputEdgeDetail : Function({ edgeDetail: noiseReduction.edgeDetail }, function () { return edgeDetail * scale.toDouble() }),
				   })
}

image = AddTag('pre-WB', image);

if (whiteBalance && whiteBalance.enabled) {
	
    if (whiteBalance.colorType == 'warmTint') {
        image = Filter("PIColorBalanceFilter", {
                       "inputImage"    : image,
                       "inputWarmTemp" : whiteBalance.warmTemp,
                       "inputWarmTint" : whiteBalance.warmTint,
                       "inputHasFace"  : whiteBalance.warmFace,
                       "inputIsRaw"    : rawImage != null
                       })
    } else if (whiteBalance.colorType == 'tempTint' && !rawImage) {
		image = Filter("PITempTintFilter", {
					   "inputImage"  : image,
					   "temperature" : whiteBalance.temperature,
					   "tint"        : whiteBalance.tint
					   })
	} else if (whiteBalance.colorType == 'faceBalance') {
		if (rawImage) {
			image = Filter("PIRAWFaceBalance", {
						   "inputImage"    : image,
						   "inputOrigI"    : whiteBalance.faceI,
						   "inputOrigQ"    : whiteBalance.faceQ,
						   "inputStrength" : whiteBalance.faceStrength,
						   "inputWarmth"   : whiteBalance.faceWarmth
						   })
		} else {
			image = Filter("CIFaceBalance", {
						   "inputImage"    : image,
						   "inputOrigI"    : whiteBalance.faceI,
						   "inputOrigQ"    : whiteBalance.faceQ,
						   "inputStrength" : whiteBalance.faceStrength,
						   "inputWarmth"   : whiteBalance.faceWarmth
						   })
		}
	} else if (whiteBalance.colorType == 'neutralGray') {
		image = Filter("PINeutralGrayWhiteBalanceFilter", {
					   "inputImage"    : image,
					   "strength"      : whiteBalance.grayStrength,
					   "warmth"        : whiteBalance.grayWarmth,
					   "y"             : whiteBalance.grayY,
					   "i"             : whiteBalance.grayI,
					   "q"             : whiteBalance.grayQ,
					   })
	}
}

image = AddTag('pre-Mute', image)
var mute = composition.mute
if (mute && mute.enabled) {
	image = Mute(image)
}
image = AddTag('Mute', image)

let loopingVideoEnabled = autoLoop && autoLoop.enabled && autoLoop.flavor != LONG_EXPOSURE_FLAVOR
if (outputIsVideo && !loopingVideoEnabled) {
	image = AddTag('pre-LivePhotoKeyFrame', image)
	if (livePhotoKeyFrame) {
		image = LivePhotoKeyFrameMetaData(image, frameTime)
	}
	image = AddTag('LivePhotoKeyFrame', image)
}

image = AddTag('pre-Trim', image)

if (videoTrim && videoTrim.enabled && !loopingVideoEnabled) {
	let startTime = TimeMake(videoTrim.start, videoTrim.startScale)
	let endTime = TimeMake(videoTrim.end, videoTrim.endScale)
	image = Trim(image, startTime, endTime)
}
image = AddTag('Trim', image)

image = AddTag('pre-SloMo', image)
let slomo = composition.slomo
if (slomo) {
    let startTime = TimeMake(slomo.start, slomo.startScale)
    let endTime = TimeMake(slomo.end, slomo.endScale)
    
    if (videoTrim && videoTrim.enabled && !loopingVideoEnabled) {
        let trimStart = TimeMake(videoTrim.start, videoTrim.startScale)
        startTime = TimeSubtract(startTime, trimStart)
        endTime = TimeSubtract(endTime, trimStart)
    }
    
    image = SloMo(image, startTime, endTime, slomo.rate)
}
image = AddTag('SloMo', image)

var smartTone = composition.smartTone
if (smartTone && smartTone.enabled) {

    var shadows = smartTone.inputShadows + smartTone.offsetShadows;

    if (canPerformLocalAdjustments) {
        var statistics
        if (usingSecondarySource && smartTone.overcaptureStatistics) {
            statistics = smartTone.overcaptureStatistics
        } else {
            statistics = smartTone.statistics
        }

		if (statistics) {
			var lightMap = statistics.lightMap
			if (lightMap) {
                let lightMapImage = null
                
                var smartShadows = shadows > 0 ? shadows : 0.0

                if (FilterAvailable("CILocalLightMapPrepare")) {

                    let translatedGuideImage = localLightGuideImage
                    if (moveFrameToOriginTransform) {
                        translatedGuideImage = Transform(localLightGuideImage, moveFrameToOriginTransform)
                    }
                    
                    lightMapImage = Filter("CILocalLightMapPrepare", {
                                           "inputLightMap" : lightMap,
                                           "inputGuideImage" : translatedGuideImage,
                                           "__dominantInputSettingsKey": "inputGuideImage",
                                           });
                    
                    if (restoreFrameFromOriginTransform) {
                        lightMapImage = Transform(lightMapImage, restoreFrameFromOriginTransform)
                    }
                    
                    image = Filter("CILocalLightFilter", {
                                   "inputImage" : image,
                                   "inputLocalLight" : smartTone.inputLocalLight + smartTone.offsetLocalLight,
                                   "inputSmartShadows" : smartShadows,
                                   "inputLightMapImage" : lightMapImage,
								   "__dominantInputSettingsKey": "inputImage",
                                   });
                } else {
                    image = Filter("CILocalLightFilter", {
                                   "inputImage" : image,
                                   "inputLocalLight" : smartTone.inputLocalLight + smartTone.offsetLocalLight,
                                   "inputSmartShadows" : smartShadows,
                                   "inputLightMap" : lightMap,
                                   "inputGuideImage" : unadjustedImage,
								   "__dominantInputSettingsKey": "inputImage",
                                   });
                }
			}
		}
	}
	
	var exposure = smartTone.inputExposure + smartTone.offsetExposure;
	var contrast = smartTone.inputContrast + smartTone.offsetContrast;
	var brightness = smartTone.inputBrightness + smartTone.offsetBrightness;
	var highlights = smartTone.inputHighlights + smartTone.offsetHighlights;
	var black = smartTone.inputBlack + smartTone.offsetBlack;
    
    image = Filter("CIHighKey", {
                   "inputImage" : image,
                   "inputStrength" : brightness,
                   });

    if (canPerformLocalAdjustments) {
        shadows = shadows < 0.0 ? shadows : 0.0;
    }

    image = Filter("CISmartToneFilter", {
				   "inputImage" : image,
				   "inputExposure" : exposure,
				   "inputContrast" : contrast,
                   "inputShadows" : shadows,
				   "inputHighlights": highlights,
				   "inputBlack" : black,
				   "inputRawHighlights" : smartTone.inputRawHighlights,
				   });
	
}

var smartColor = composition.smartColor
if (smartColor && smartColor.enabled) {
	image = Filter("CISmartColorFilter", {
				   inputImage: image,
				   inputCast: smartColor.inputCast + smartColor.offsetCast,
				   inputVibrancy: smartColor.inputSaturation + smartColor.offsetSaturation,
				   });
    
    image = Filter("CIVibrance", {
                   "inputImage" : image,
                   "inputAmount" : smartColor.inputContrast + smartColor.offsetContrast,
                   });

}

image = AddTag('pre-Curves', image)
var curves = composition.curves
if (curves && curves.enabled) {
    let lutImage = Filter("PICurvesLUTFilter", {
                          inputPointsR: curves.pointsR,
                          inputPointsG: curves.pointsG,
                          inputPointsB: curves.pointsB,
                          inputPointsL: curves.pointsL,
                          });
	image = Filter("PICurvesFilter", {
				   inputImage : image,
				   inputTableImage : lutImage,
                   "__dominantInputSettingsKey" : "inputImage",
				   })
}

var selectiveColor = composition.selectiveColor
if (selectiveColor && selectiveColor.enabled) {
	
	let corrections = selectiveColor.corrections;
	let correctionCount = corrections.length;
	
	if (correctionCount > 0) {
		
		var normalizedCorrections = new Array();
		
		for (let i = 0; i < correctionCount; ++i) {
			
			let currentCorrection = corrections[i];
			var normalizedCorrection = {};
			normalizedCorrection.red = currentCorrection.red;
			normalizedCorrection.green = currentCorrection.green;
			normalizedCorrection.blue = currentCorrection.blue;
			normalizedCorrection.spread = currentCorrection.spread;
			normalizedCorrection.hueShift = currentCorrection.hueShift / 60.0;
			normalizedCorrection.saturation = currentCorrection.saturation / 100.0;
			normalizedCorrection.luminance = currentCorrection.luminance / 70.0;
			
			normalizedCorrections.push(normalizedCorrection);
		}
		
		image = Filter("PISelectiveColorFilter", {
					   inputImage : image,
					   inputCorrections : normalizedCorrections,
					   })
	}
}

image = AddTag('pre-Levels', image)
var levels = composition.levels
if (levels && levels.enabled) {
	image = Filter("PILevelsFilter", {
				   inputImage : image,
				   inputColorSpace : levels.colorSpace,
				   inputBlackSrcRGB : levels.blackSrcRGB,
				   inputBlackDstRGB : levels.blackDstRGB,
				   inputShadowSrcRGB : levels.shadowSrcRGB,
				   inputShadowDstRGB : levels.shadowDstRGB,
				   inputMidSrcRGB : levels.midSrcRGB,
				   inputMidDstRGB : levels.midDstRGB,
				   inputHilightSrcRGB : levels.hilightSrcRGB,
				   inputHilightDstRGB : levels.hilightDstRGB,
				   inputWhiteSrcRGB : levels.whiteSrcRGB,
				   inputWhiteDstRGB : levels.whiteDstRGB,
				   
				   inputBlackSrcRed : levels.blackSrcRed,
				   inputBlackDstRed : levels.blackDstRed,
				   inputShadowSrcRed : levels.shadowSrcRed,
				   inputShadowDstRed : levels.shadowDstRed,
				   inputMidSrcRed : levels.midSrcRed,
				   inputMidDstRed : levels.midDstRed,
				   inputHilightSrcRed : levels.hilightSrcRed,
				   inputHilightDstRed : levels.hilightDstRed,
				   inputWhiteSrcRed : levels.whiteSrcRed,
				   inputWhiteDstRed : levels.whiteDstRed,
				   
				   inputBlackSrcGreen : levels.blackSrcGreen,
				   inputBlackDstGreen : levels.blackDstGreen,
				   inputShadowSrcGreen : levels.shadowSrcGreen,
				   inputShadowDstGreen : levels.shadowDstGreen,
				   inputMidSrcGreen : levels.midSrcGreen,
				   inputMidDstGreen : levels.midDstGreen,
				   inputHilightSrcGreen : levels.hilightSrcGreen,
				   inputHilightDstGreen : levels.hilightDstGreen,
				   inputWhiteSrcGreen : levels.whiteSrcGreen,
				   inputWhiteDstGreen : levels.whiteDstGreen,
				   
				   inputBlackSrcBlue : levels.blackSrcBlue,
				   inputBlackDstBlue : levels.blackDstBlue,
				   inputShadowSrcBlue : levels.shadowSrcBlue,
				   inputShadowDstBlue : levels.shadowDstBlue,
				   inputMidSrcBlue : levels.midSrcBlue,
				   inputMidDstBlue : levels.midDstBlue,
				   inputHilightSrcBlue : levels.hilightSrcBlue,
				   inputHilightDstBlue : levels.hilightDstBlue,
				   inputWhiteSrcBlue : levels.whiteSrcBlue,
				   inputWhiteDstBlue : levels.whiteDstBlue
				   })
}

var smartBlackAndWhite = composition.smartBlackAndWhite
if (smartBlackAndWhite && smartBlackAndWhite.enabled) {
	image = Filter("CISmartBlackAndWhite", {
				   "inputImage" : image,
				   "inputHue" : smartBlackAndWhite.hue,
				   "inputStrength" : smartBlackAndWhite.strength,
				   "inputNeutralGamma" : smartBlackAndWhite.neutral,
				   "inputTone" : smartBlackAndWhite.tone,
                   "inputGrain" : Function({ grain: smartBlackAndWhite.grain }, function () { return grain * scale.toDouble() }),
				   });
}


sharpen = composition.sharpen
if (sharpen && sharpen.enabled) {

	image = Filter("CIProSharpenEdges", {
				   inputImage : Clamp(image),
                   inputEdgeScale : sharpen.edges * 5.5,
                   inputFalloff : Function({ falloff: sharpen.falloff }, function () { return scale.toDouble() * falloff }),
                   inputSharpness : Function({ intensity: sharpen.intensity }, function () {
                       var s = 1 - (2 * scale.toDouble() * intensity);
					   return 1 - ((s >= 0) ? Math.log10(1+9*s) : -Math.log10(1-9*s));
                   }),
                   })
    
    if (moveFrameToOriginTransform) {
        image = Transform(image, moveFrameToOriginTransform)
    }
    
    var extent = image.geometry.extent
    image = Crop(image, extent.x, extent.y, extent.width, extent.height)
    
    if (restoreFrameFromOriginTransform) {
        image = Transform(image, restoreFrameFromOriginTransform)
    }
}

definition = composition.definition
if (definition && definition.enabled) {
    var extent = image.geometry.extent
    image = Filter("CILocalContrast", {inputImage : image, inputStrength : 2.0 * definition.intensity} )
    
    if (moveFrameToOriginTransform) {
        image = Transform(image, moveFrameToOriginTransform)
    }
    
    var extent = image.geometry.extent
    image = Crop(image, extent.x, extent.y, extent.width, extent.height)
    
    if (restoreFrameFromOriginTransform) {
        image = Transform(image, restoreFrameFromOriginTransform)
    }
}

var effect = composition.effect
if (effect) {
    
    var imageWithoutEffect = image;
    
    image = Filter("CIPhotoEffect" + effect.kind, {
                                 inputImage : image,
                                 filterVersion : effect.version,
                                 });
    
    if (effect.intensity != null){
        
        image = Filter("CIDissolveTransition", {
                      inputImage : imageWithoutEffect,
                      inputTargetImage : image,
                      inputTime : effect.intensity,
                       "__dominantInputSettingsKey": "inputTargetImage",
                      });
    }
}

if (effect3DEnabled) {
    
    var imageWithoutEffect = image;
    
    let filterName = "CIPhotoEffect" + effect3D.kind
    
    image = Filter(filterName, {
                   "inputImage": image,
                   "inputDepthMap": gammaBlurMap,
                   "inputThreshold": 0.5,
                   "__dominantInputSettingsKey": "inputImage",
                   })
    
    if (effect3D.intensity != null){
        
        image = Filter("CIDissolveTransition", {
                       inputImage : imageWithoutEffect,
                       inputTargetImage : image,
                       inputTime : effect3D.intensity,
                       "__dominantInputSettingsKey": "inputTargetImage",
                       });
    }
}


var grain = composition.grain
if (grain && grain.enabled){
    image = Filter("CIPhotoGrain", {
                   "inputImage" : image,
                   "inputISO" : grain.iso,
                   "inputSeed" : grain.seed != null ? grain.seed : 0,
                   "inputAmount" : Function({ amount: grain.amount }, function () { return amount * scale.toDouble() }),
                   });
}

image = AddTag('pre-VideoReframe', image)

var videoReframe = composition.videoReframe
if (videoReframe && videoReframe.enabled) {
    image = VideoReframe(image, videoReframe)
}

image = AddTag('VideoReframe', image)

image = AddTag('pre-VideoStabilize', image)

var videoStabilize = composition.videoStabilize
if (videoStabilize && videoStabilize.enabled && (!videoReframe || !videoReframe.enabled)) {
    image = VideoReframe(image, videoStabilize)
}

image = AddTag('VideoStabilize', image)

image = AddTag('pre-VideoCrossfadeLoop', image)

var crossfadeLoop = composition.videoCrossfadeLoop
if (crossfadeLoop && crossfadeLoop.enabled) {
    image = VideoCrossfadeLoop(image, crossfadeLoop)
}

image = AddTag('VideoCrossfadeLoop', image)


image = AddTag('pre-Geometry', image)

image = AddTag('pre-Crop', image)
var crop = composition.cropStraighten
if (crop && crop.enabled) {
	if (crop.pitch || crop.yaw) {
		var perspectiveTransform = PerspectiveTransformMake(crop.angle, crop.pitch, crop.yaw, image.geometry)
		image = Transform(image, perspectiveTransform)
	} else {
		var straightenTransform = StraightenTransformMake(crop.angle, image.geometry)
		image = Transform(image, straightenTransform)
	}
    
    image = AddTag('perspectiveStraighten', image)
	
    cropSettings = { resetCleanAperture: true }
	
    if (projectDirtyApertureInCrop) {
        videoProperties = image.videoProperties
        if (videoProperties) {
            cropSettings['projectUsingCleanAperture'] = videoProperties.originalCleanAperture
            cropSettings['projectUsingOriginalSize'] = videoProperties.originalSize

            if (videoProperties.containsMetadata("com.apple.quicktime.live-photo.vitality-disabled")) {
                cropSettings['projectUsingEstimatedCleanAperture'] = 0.1
            }
        }
    }
    
	image = Crop(image, crop.xOrigin, crop.yOrigin, crop.width, crop.height, cropSettings)
}
image = AddTag('Crop', image)

image = AddTag('pre-Orientation', image)
var orientation = composition.orientation
if (orientation) {
	image = Orient(image, orientation.value)
}
image = AddTag('Orientation', image)

image = AddTag('post-Geometry', image)

var vignette = composition.vignette
if (vignette && vignette.enabled) {
	
	
    let cx = image.geometry.extent.x + image.geometry.size.width  * 0.5
    let cy = image.geometry.extent.y + image.geometry.size.height * 0.5

    var falloff = vignette.falloff;
	var intensity = vignette.intensity;
	var radius = 1.0 - vignette.radius;
	
	if (intensity < 0) {
		intensity = -Math.pow(-intensity, 0.6);
		radius = 0.4*(radius-.5)+0.7;
	} else {
		intensity = Math.pow(intensity, 0.6);
		radius = 0.3*(radius-.5)+0.5;
	}
	
	radius = radius * Math.max(image.geometry.size.height, image.geometry.size.width)
	
	image = Filter("CIVignetteEffect", {
				   "inputImage" : image,
                   "inputCenter" : Function({ cx: cx, cy: cy }, function () { let s = scale.toDouble(); return CIVectorMake(cx * s, cy * s) }),
				   "inputIntensity" : intensity,
                   "inputRadius" : Function({ radius: radius }, function () { return radius * scale.toDouble() }),
				   "inputFalloff": falloff
				   });
}


image = AddTag('post-Adjustments', image)

if (rawImage) {
	image = Filter("PIInverseFakeBoost", {
				   "inputImage" : image,
                   "inputBoost" : 1.0,
				   })
	
	ResetTagInput('Master/RAW/Linear', image)
	image = rawOutput
}

image = AddTag('Image', image);


        
function getPortraitEffectVersion(portraitEffect){
    let portraitVersion = 1;
    switch (portraitEffect.kind) {
        case "StudioV2":
        case "ContourV2":
        case "StageV2":
        case "StageMonoV2":
        case "StageWhite":
            portraitVersion = 2;
            break;
        default:
            portraitVersion = 1;
            break;
    }
    
    return portraitVersion;
}

function getCroppedAuxillaryImage(auxillaryTypeString ){
    
    let auxImageSettings = { auxiliaryImageType: auxillaryTypeString, skipOrientation: true, nativeScale: true };
    
    if (SourceIsAvailable(composition.source, auxImageSettings)) {
        
        let auxImage = Source(composition.source, auxImageSettings);
        let auxImageExtent = auxImage.geometry.extent;
        auxImage = Crop(auxImage, auxImageExtent.x, auxImageExtent.y, auxImageExtent.width, auxImageExtent.height);
        
        return auxImage;
    } else {
        return null;
    }
}

function performLongExposureFusion(highResFusion, longExposureImage)
{
    let alignment = highResFusion["alignment"]
    let extent = alignment["extent"]
    let transform = alignment["transform"]
    let motionMask = GetTag('AutoLoop/LongExposureMotion');
    let scaledStillImage = Source(composition.source, {'mediaComponentType': "Image", 'skipOrientation':true});
    let scaledImage = Filter("PILongExposureFusion", {
                         "inputImage" : longExposureImage,
                         "inputStillImage" : scaledStillImage,
                         "inputMaskImage" : motionMask,
                         "__dominantInputSettingsKey" : "inputStillImage",
                         "inputVideoScale" : longExposureImage.geometry.scale.toDouble(),
                         "inputRenderScale" : Function({}, function () { return scale.toDouble() }),
                         "inputAlignmentExtent" : CIVectorMake(extent),
                         "inputAlignmentTransform" : CIVectorMake(transform),
                     })
    
    return Crop(scaledImage, 0, 0, extent[2], extent[3])
}

function performRedEye(redEyeAdjustment, image)
{
	let corrections = redEyeAdjustment.inputCorrectionInfo
	if (corrections.length > 0)
    {
        let inputCameraModel = redEyeAdjustment.iPhone ? 'iPhone' : '';
        
        image = Filter("PIRedEye", {
                       "inputImage" : ResetScale(image, ScaleMake(1,1)),
                       "inputDestinationImage" : image,
                       "inputCorrectionInfo" : corrections,
                       "inputCameraModel" : inputCameraModel,
                       "__dominantInputSettingsKey" : "inputDestinationImage",
                       });
    }

	return image;
}

function performApertureRedEye(redEyeAdjustment, scaledImage)
{
    let spotsFunc = Function({ corrections: redEyeAdjustment.inputCorrectionInfo }, function () {
        let minRadius = 3
        let maxRadius = 400

        let spots = new Array()
        let scaleValue = scale.toDouble()
                             
        for (let i = 0; i < corrections.length; ++i) {
            
            var currentCorrection = corrections[i];
            var inputCenter = CGPoint(currentCorrection.pointX * scaleValue, currentCorrection.pointY * scaleValue);
            var inputRadius = currentCorrection.radius;
            var inputSensitivity = currentCorrection.sensitivity;
            
            
            var scaledRadius = (inputRadius + 10.0) * scaleValue;
            scaledRadius = (scaledRadius < maxRadius) ? scaledRadius : maxRadius;
            
            if (scaledRadius < minRadius)
                continue;
            
            var spot = {inputCenter: inputCenter, inputRadius: scaledRadius, inputSensitivity: inputSensitivity}
            spots.push(spot)
        }
        return spots
    })

    scaledImage = Filter("PIApertureRedEyeFilter", {
                         "inputImage" : scaledImage,
                         "inputSpots" : spotsFunc,
                         });

	return scaledImage
}

return image;

