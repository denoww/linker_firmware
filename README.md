#### install

wget -O - https://raw.githubusercontent.com/denoww/linker_firmware/master/linker_service | bash -s install

#### Consertar linker_service estragado

wget -O - https://raw.githubusercontent.com/denoww/linker_firmware/master/linker_service | bash -s update_service

##### start

linker_service start

#### help

linker_service help

#### reset_data (caso não saibam a senha de /config)

linker_service reset_data
