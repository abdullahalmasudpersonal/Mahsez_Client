export type visitorDeviceInfo = {
  device: string;
  brand: string;
  type: string;
  os: string;
  cpu: string;
  osVersion: string;
  browser: string;
  browserVersion: string;
};

export type visitorIspInfo = {
  country: string;
  region: string;
  regionName: string;
  city: string;
  isp: string;
  org: string;
  as: string;
  lat: number;
  lon: number;
  timezone: string;
};

export interface TVisitors {
  _id: string;
  ip: string;
  sessionId: string;
  visitCount: number;
  deviceInfo: visitorDeviceInfo;
  ispInfo: visitorIspInfo;
  visitedAt: Date;
  lastVisitedAt: Date;
}
