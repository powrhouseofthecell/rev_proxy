type Service = {
  [key: string]: string;
};

const service_ip_map: Service = {
  "client-hq": 'http://127.0.0.1:3002',
  "node-tree": 'http://127.0.0.1:3001',
  "production-floor": 'http://127.0.0.1:3003',
  "tgs": 'https://127.0.0.1:3051',
};

export default service_ip_map;
