// vfx-codegen-def: elasticEase
fileprivate func elasticEase##(_ t: Float, _ oscillations: Int32, _ springiness: Float) -> Float {
    let o = max(0.0, Float(oscillations))
    let k = max(0.0, springiness)
    let f = o + 0.25
    let a = (k == 0) ? t : (1.0 - exp(k * t)) / (1.0 - exp(k))
    return a * sin(.pi * 2 * f * t)
}
// vfx-codegen-def: logBase
fileprivate func logBase##(_ a: Float, base: Float) -> Float {
    return log(a) / log(base);
}
// vfx-codegen-def: bounceEase dependencies: Easing@logBase
fileprivate func bounceEase##(_ t: Float, _ bounces: Int32, _ bounciness: Float) -> Float {
    let n = max(0.0, Float(bounces))
    let b = min(1.01, bounciness)
    let bn = pow(b, n)
    let oneMinusBn = 1.0 - bn
    let sum = ((1.0 - bn) / oneMinusBn) + (bn * 0.5)
    let x = t * sum
    let i = floor(logBase##((-x * (1.0 - b)) + 1.0, base: b))
    let xStart = (1.0 - pow(b, i)) / oneMinusBn
    let xEnd = (1.0 - pow(b, i + 1.0)) / oneMinusBn
    let xVertex = (xStart + xEnd) / 2.0
    let xRel = x - xVertex
    let xNormalized = xRel / (xEnd - xVertex)
    let aNormalized = pow(1.0 / b, n - i)
    return aNormalized * (1 - xNormalized * xNormalized);
}
