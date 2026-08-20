module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  const token = process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN;
  const result = {
    ok: true,
    rootline: true,
    aiGatewayAuthAvailable: Boolean(token),
    authMode: process.env.AI_GATEWAY_API_KEY ? 'api-key' : (process.env.VERCEL_OIDC_TOKEN ? 'vercel-oidc' : 'none'),
    aiGatewayReachable: false,
    checkedAt: new Date().toISOString()
  };
  try {
    const r = await fetch('https://ai-gateway.vercel.sh/v1/models', token ? { headers: { Authorization: `Bearer ${token}` } } : {});
    result.aiGatewayReachable = r.ok;
    result.gatewayStatus = r.status;
  } catch (error) {
    result.gatewayError = error.message;
  }
  return res.status(200).json(result);
};
