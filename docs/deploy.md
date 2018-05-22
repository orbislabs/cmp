# Deployment Procedure - Google Cloud

## Install Stackdriver Agents on Machine
```bash
# To install the Stackdriver monitoring agent:
$ curl -sSO https://dl.google.com/cloudagents/install-monitoring-agent.sh
$ sudo bash install-monitoring-agent.sh

# To install the Stackdriver logging agent:
$ curl -sSO https://dl.google.com/cloudagents/install-logging-agent.sh
$ sudo bash install-logging-agent.sh
```

#### Error due to PORT 80 block

```bash
Setting up nginx-full (1.10.3-1+deb9u1) ...
Job for nginx.service failed because the control process exited with error code.
See "systemctl status nginx.service" and "journalctl -xe" for details.
invoke-rc.d: initscript nginx, action "start" failed.
● nginx.service - A high performance web server and a reverse proxy server
   Loaded: loaded (/lib/systemd/system/nginx.service; enabled; vendor preset: enabled)
   Active: failed (Result: exit-code) since Tue 2018-05-22 16:14:58 UTC; 14ms ago
     Docs: man:nginx(8)
  Process: 6367 ExecStart=/usr/sbin/nginx -g daemon on; master_process on; (code=exited, status=1/FAILURE)
  Process: 6365 ExecStartPre=/usr/sbin/nginx -t -q -g daemon on; master_process on; (code=exited, status=0/SUCCESS)
May 22 16:14:57 instance-1 nginx[6367]: nginx: [emerg] bind() to [::]:80 failed (98: Address already in use)
May 22 16:14:57 instance-1 nginx[6367]: nginx: [emerg] bind() to 0.0.0.0:80 failed (98: Address already in use)
May 22 16:14:57 instance-1 nginx[6367]: nginx: [emerg] bind() to [::]:80 failed (98: Address already in use)
May 22 16:14:58 instance-1 nginx[6367]: nginx: [emerg] bind() to 0.0.0.0:80 failed (98: Address already in use)
May 22 16:14:58 instance-1 nginx[6367]: nginx: [emerg] bind() to [::]:80 failed (98: Address already in use)
May 22 16:14:58 instance-1 nginx[6367]: nginx: [emerg] still could not bind()
May 22 16:14:58 instance-1 systemd[1]: nginx.service: Control process exited, code=exited status=1
May 22 16:14:58 instance-1 systemd[1]: Failed to start A high performance web server and a reverse proxy server.
May 22 16:14:58 instance-1 systemd[1]: nginx.service: Unit entered failed state.
May 22 16:14:58 instance-1 systemd[1]: nginx.service: Failed with result 'exit-code'.
dpkg: error processing package nginx-full (--configure):
 subprocess installed post-installation script returned error exit status 1
```