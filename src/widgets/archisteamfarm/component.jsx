import Block from "components/services/widget/block";
import Container from "components/services/widget/container";
import { useTranslation } from "react-i18next";

import useWidgetAPI from "utils/proxy/use-widget-api";

// copied from ASF-ui
// https://github.com/JustArchiNET/ASF-ui/blob/ac29dede9b73390fbe0e448f551da5d48753cdd5/src/models/Bot.js#L67
const timeSpanRegex = /(?:(\d+).)?(\d{2}):(\d{2}):(\d{2})(?:.?(\d{7}))?/;
function timeRemainingSeconds(remaining) {
  const [, days, hours, minutes, seconds] = timeSpanRegex.exec(remaining);

  let time = 0;

  if (days) time += parseInt(days, 10) * 24 * 60 * 60;
  if (hours) time += parseInt(hours, 10) * 60 * 60;
  if (minutes) time += parseInt(minutes, 10) * 60;
  if (seconds) time += parseInt(seconds, 10);

  return time;
}

export default function Component({ service }) {
  const { t } = useTranslation();

  const { widget } = service;
  const { data, error } = useWidgetAPI(widget);

  if (error) {
    return <Container service={service} error={error} />;
  }

  if (!data) {
    return (
      <Container service={service}>
        <Block label="archisteamfarm.bots" />
        <Block label="archisteamfarm.farming" />
        <Block label="archisteamfarm.cardsRemaining" />
        <Block label="archisteamfarm.timeRemaining" />
      </Container>
    );
  }

  const result = Object.values(data.Result);
  const bots = result.reduce(
    (acc, cur) => {
      acc.farming += cur.CardsFarmer.NowFarming ? 1 : 0;
      acc.cardsRemaining += cur.CardsFarmer.GamesToFarm.reduce((acc, cur) => acc + cur.CardsRemaining, 0);
      acc.timeRemaining = Math.max(acc.timeRemaining, timeRemainingSeconds(cur.CardsFarmer.TimeRemaining));
      return acc;
    },
    { farming: 0, timeRemaining: 0, cardsRemaining: 0 },
  );

  return (
    <Container service={service}>
      <Block label="archisteamfarm.bots" value={result.length} />
      <Block label="archisteamfarm.farming" value={bots.farming} />
      <Block label="archisteamfarm.cardsRemaining" value={bots.cardsRemaining || "-"} />
      <Block label="archisteamfarm.timeRemaining" value={t("common.duration", { value: bots.timeRemaining }) || "-"} />
    </Container>
  );
}
