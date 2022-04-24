// vfx-codegen-def: elasticEase
float elasticEase##(float t, int32_t oscillations, float springiness) {
    float o = fmax(0.0f, oscillations);
    float k = fmax(0.0f, springiness);
    float f = o + 0.25f;
    float a = (k == 0) ? t : (1.0f - expf(k * t)) / (1.0f - expf(k));
    return a * sinf(M_PI * 2 * f * t);
}
// vfx-codegen-def: logBase
float logBase##(float a, float base) {
    return logf(a) / logf(base);
}
// vfx-codegen-def: bounceEase dependencies: Easing@logBase
float bounceEase##(float t, int32_t bounces, float bounciness) {
    float n = fmax(0.0f, bounces);
    float b = fmin(1.01f, bounciness);
    float bn = powf(b, n);
    float oneMinusBn = 1.0 - bn;
    float sum = ((1.0 - bn) / oneMinusBn) + (bn * 0.5);
    float x = t * sum;
    float i = floorf(logBase##((-x * (1.0 - b)) + 1.0, b));
    float xStart = (1.0 - powf(b, i)) / oneMinusBn;
    float xEnd = (1.0 - powf(b, i + 1.0)) / oneMinusBn;
    float xVertex = (xStart + xEnd) / 2.0;
    float xRel = x - xVertex;
    float xNormalized = xRel / (xEnd - xVertex);
    float aNormalized = powf(1.0 / b, n - i);
    return aNormalized * (1 - xNormalized * xNormalized);
}
