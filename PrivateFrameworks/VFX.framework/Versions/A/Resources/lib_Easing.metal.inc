// vfx-codegen-def: elasticEase
float elasticEase##(float t, int32_t oscillations, float springiness) {
    float o = max(0.0, float(oscillations));
    float k = max(0.0, springiness);
    float f = o + 0.25;
    float a = (k == 0) ? t : (1.0 - exp(k * t)) / (1.0 - exp(k));
    return a * sin(M_PI_F * 2 * f * t);
}
// vfx-codegen-def: logBase
float logBase##(float a, float base) {
    return log(a) / log(base);
}
// vfx-codegen-def: bounceEase dependencies: Easing@logBase
float bounceEase##(float t, int32_t bounces, float bounciness) {
    float n = max(0.0, float(bounces));
    float b = min(1.01, bounciness);
    float bn = pow(b, n);
    float oneMinusBn = 1.0 - bn;
    float sum = ((1.0 - bn) / oneMinusBn) + (bn * 0.5);
    float x = t * sum;
    float i = floor(logBase##((-x * (1.0 - b)) + 1.0, b));
    float xStart = (1.0 - pow(b, i)) / oneMinusBn;
    float xEnd = (1.0 - pow(b, i + 1.0)) / oneMinusBn;
    float xVertex = (xStart + xEnd) / 2.0;
    float xRel = x - xVertex;
    float xNormalized = xRel / (xEnd - xVertex);
    float aNormalized = pow(1.0 / b, n - i);
    return aNormalized * (1 - xNormalized * xNormalized);
}
