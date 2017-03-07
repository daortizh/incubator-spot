const SpotDispatcher = require('../../../js/dispatchers/SpotDispatcher');
const SpotConstants = require('../../../js/constants/SpotConstants');

const ObservableWithHeadersGraphQLStore = require('../../../js/stores/ObservableWithHeadersGraphQLStore');

const DNS_QUERY_VAR = 'dnsQuery';
const TIME_VAR = 'frameTime';

class DetailsStore extends ObservableWithHeadersGraphQLStore {
    constructor() {
        super();

        this.headers = {
            frame_time: 'Timestamp',
            frame_len: 'Length',
            ip_dst: 'Client IP',
            ip_src: 'Server IP',
            dns_qry_name: 'Query',
            dns_qry_class_name: 'Query Class',
            dns_qry_type_name: 'Query Type',
            dns_qry_rcode_name: 'Response Code',
            dns_a: 'Answer'
        };

        this.ITERATOR = ['frame_time', 'frame_len', 'ip_dst', 'ip_src', 'dns_qry_name', 'dns_qry_class_name', 'dns_qry_type_name', 'dns_qry_rcode_name', 'dns_a'];
    }

    getQuery() {
        return `
            query($frameTime:SpotDatetimeType!,$dnsQuery:String!) {
                dns {
                    edgeDetails(frameTime: $frameTime, dnsQuery:$dnsQuery) {
                        dns_a: dnsQueryAnswers
                        frame_len: frameLength
                        dns_qry_type_name: dnsQueryTypeLabel
                        dns_qry_rcode_name: dnsQueryRcodeLabel
                        ip_dst: clientIp
                        dns_qry_class_name: dnsQueryClassLabel
                        frame_time: frameTime
                        ip_src: serverIp
                        dns_qry_name: dnsQuery
                    }
                }
            }
        `;
    }

    unboxData(data) {
        return data.dns.edgeDetails;
    }

    setDnsQuery(dnsQuery) {
        this.setVariable(DNS_QUERY_VAR, dnsQuery);
    }

    setTime(time) {
        this.setVariable(TIME_VAR, time);
    }
}

const ds = new DetailsStore();

SpotDispatcher.register(function (action) {
  switch (action.actionType) {
    case SpotConstants.SELECT_THREAT:
      ds.setDnsQuery(action.threat.dns_qry_name);
      ds.setTime(action.threat.frame_time);
      break;
    case SpotConstants.RELOAD_SUSPICIOUS:
      ds.resetData();
      break;
    case SpotConstants.RELOAD_DETAILS:
      ds.sendQuery();
      break;
  }
});

module.exports = ds;
