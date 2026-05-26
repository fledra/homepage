---
title: ArchiSteamFarm
description: ArchiSteamFarm Widget Configuration
---

Learn more about [ArchiSteamFarm](https://github.com/JustArchiNET/ArchiSteamFarm).

Define same username and password that is used for login from web or supported apps

Allowed fields: `["bots", "farming", "cardsRemaining", "timeRemaining"]`.

```yaml
widget:
  type: archisteamfarm
  url: http://archisteamfarm.host.or.ip:port
  key: your-ipc-password
  bots: asf # comma seperated bot names, use asf to include all bots
```
