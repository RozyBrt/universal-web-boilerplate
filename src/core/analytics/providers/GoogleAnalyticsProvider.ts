import { AnalyticsProviderInterface } from "./AnalyticsProvider.interface";
export class GoogleAnalyticsProvider implements AnalyticsProviderInterface {
  track(_event: string, _props?: Record<string, unknown>) {}
  identify(_userId: string, _traits?: Record<string, unknown>) {}
}
