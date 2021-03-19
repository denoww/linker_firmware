#### install_firmware

- baixe o linker_service
  - wget -O - https://raw.githubusercontent.com/denoww/linker_firmware/master/linker_service | bash -s update_service
- instale sem perguntar nada
  - linker_service install_firmware -f
- ou instalar perguntando itens a instalar
  - linker_service install_firmware

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
