#pragma transparent

#pragma arguments
float crop_pos;

#pragma body
float4   referencePosition = scn_frame.viewTransform * float4(0, crop_pos, 0, 1);
float2x4 positions = float2x4(referencePosition, float4(_surface.position, 1));
float2x4 screenspacePositions = scn_frame.projectionTransform * positions;

float4 screenspaceReferencePosition = screenspacePositions[0];
float4 screenspacePosition          = screenspacePositions[1];

if (screenspacePosition.y / screenspacePosition.w < screenspaceReferencePosition.y / screenspaceReferencePosition.w)
    discard_fragment();
