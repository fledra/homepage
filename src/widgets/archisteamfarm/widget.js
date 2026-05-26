import genericProxyHandler from "utils/proxy/handlers/generic";

const widget = {
  api: "{url}/api/bot/{bots}?password={key}",
  proxyHandler: genericProxyHandler,
};

export default widget;
