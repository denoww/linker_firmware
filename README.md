#### install_firmware

- pergunta o que quer instalar

  - wget -O - https://raw.githubusercontent.com/denoww/linker_firmware/master/linker_service | bash -s install_firmware

- -f para instalar tudo sem perguntar

  - wget -O - https://raw.githubusercontent.com/denoww/linker_firmware/master/linker_service | bash -s install_firmware -f

#### update_firmware

- linker_service update_firmware

#### Consertar/Instalar linker_service

- wget -O - https://raw.githubusercontent.com/denoww/linker_firmware/master/linker_service | bash -s update_service

##### start_prod

- linker_service start_prod

##### logs

- linker_service logs

#### help

- linker_service help

#### reset_data (caso não saibam a senha de /config)

- linker_service reset_data_prod
- linker_service reset_data_dev
