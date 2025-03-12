#### limpar espaço

* sudo apt-get autoclean; sudo apt-get clean; 
* sudo rm -rf /var/tmp/*
* sudo rm -rf /tmp/*
* rm -rf ~/.cache/*


#### consertar postgres

* sudo service postgresql start
* systemctl restart postgresql.service; systemctl status postgresql@11-main.service
* ou
* linker_service reinstall_postgres -force


#### caso for cria imagem para microsd -> de preferencia para ubuntu focal desktop ou bionic desktop por ser mais leve

#### configurar minipc


  - sudo passwd orangepi
  - sudo passwd root
  - sudo dpkg-reconfigure keyboard-configuration
  - sudo reboot
  - sudo apt-get update
  - sudo apt-get upgrade
  - sudo reboot
  - sudo apt install chromium-browser
  - baixe o linker_service
  - wget -O - https://raw.githubusercontent.com/denoww/linker_firmware/master/linker_service | bash -s update_service
  - ou
  - wget -O - www.seucondominio.com.br/linker_service | bash -s update_service
  - linker_service config_wifi
  - linker_service install_teamviewer

#### install_firmware

  - linker_service install_firmware -f


- ou instalar perguntando itens a instalar
  - linker_service install_firmware

#### copy sd to emmc

$ sudo nand-sata-install

marque boot from eMMC - system on eMMC

confirme e depois marque ext4

#### clone emmc para cartão micro sd

```
Tenha um sd recém formatado ext4 com software gparted do ubuntu
$ lsblk
ou
$ df -h
vai listar algo assim
/dev/mmcblk2p1  7.0G  6.6G   68M 100% /
/dev/zram1       47M  3.5M   40M   8% /var/log
Então coloque no if a origem e no of o destino (coloque sem "p1" no final)
$ sudo dd bs=1024 if=/dev/mmcblk0 of=/dev/mmcblk1



```

#### update_firmware

- linker_service update_firmware

#### Consertar/Instalar linker_service

- wget -O - https://raw.githubusercontent.com/denoww/linker_firmware/master/linker_service | bash -s update_service

#### start_prod

- linker_service start_prod

#### logs

- linker_service logs

#### help

- linker_service help

#### reset_data (caso não saibam a senha de /config)

- linker_service reset_data


### Observações

/var/lib/linker_firmware é onde fica instalado o firmware


### Orange PI

#### postgres senha - Orange PI

Pegar a senha do postgres com

```$ cat /etc/environment```

Editar docker-compose

```$ sudo nano /var/lib/linker_firmware/docker-compose.yml```

comentar env_file e descomentar abaixo informando a senha do postgres que esta em 

```
environment:
      - LINKER_DB_PASSWORD=xxxxxxxxxxxxxxxxxxxx
```


#### postgres permitir conexoes - Orange PI

Edite pg_hba.conf

```$sudo nano  /etc/postgresql/11/main/pg_hba.conf```

Va ate o final e deixe mais ou menos assim

```
local   postgres        all                                   peer
host    all             all             0.0.0.0/0             trust
host    all             all             ::/0                  trust
```
Reinicie o postgres

```$ systemctl restart postgresql.service; systemctl status postgresql@11-main.service```

#### teclado - Orange PI

teclado portrugues -> menu -> settings -> layout -> keyboard layout -> portuguese brazil (no dead keys)

#### teamviewer - Orange PI

```
Installed the armhf deb from here.
sudo dpkg --add-architecture armhf
sudo apt-get update
sudo apt-get upgrade
sudo apt-get -f install
sudo apt-get install libxtst6:armhf
sudo teamviewer --daemon enable
```
#### login teamviwer: nao pede senha de admin - resolva assim para pedir

```
sudo teamviewer setup
========== OU =============
stop current teamviewer
sudo /opt/teamviewer/tv_bin/TeamViewer --allowRoot
then grant access as usual
stop root teamviewer
start teamviewer with your usual account , access is still granted !
```

#### ligar/desligar GUI - deixar o sistema mais leve

SEM GUI sempre que reiniciar

```
sudo systemctl set-default multi-user.target
sudo reboot
```

COM GUI sempre que reiniciar

```
sudo systemctl set-default graphical.target
sudo reboot
```

### Venda de CASES para SBC (single board computer)

https://kksb-cases.com
