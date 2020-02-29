
#!/bin/bash

mkdir -p /var/run/sshd
useradd -s /bin/bash -d /usr/local/epibot $SSH_USER
adduser $SSH_USER sudo
echo $SSH_USER:$SSH_PASS | chpasswd
echo "$SSH_USER ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers
cp /root/.profile /usr/local/epibot-js/.profile
chown $SSH_USER /usr/local/epibot-js/.profile
echo "PS1='\${debian_chroot:+(\$debian_chroot)}\[\033[01;32m\]\u@epibot\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\]\\$ '" > /usr/local/epibot-js/.bashrc
echo "PS1='\${debian_chroot:+(\$debian_chroot)}\[\033[01;32m\]\u@epibot\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\]\\$ '" >> /root/.bashrc
chown $SSH_USER /usr/local/epibot-js/.bashrc
sed -i "/.*Port .*/cPort $SSH_PORT" /etc/ssh/sshd_config
echo $epibot_PORT > /usr/local/epibot-js/.port
cp -f /usr/local/epibot-js/scripts/motd /etc/motd  > /dev/null 2>&1

service ssh start
epibot start

cat /etc/motd
tail -f ./log/epibot.log