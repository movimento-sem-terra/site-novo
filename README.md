Portal do MST
===
Portal do Movimento dos Trabalhadores sem Terra http://www.mst.org.br


## Para executar o site local

Faça o clone do repositório:

```
git clone https://github.com/movimento-sem-terra/site-novo.git && cd site-novo
```

## Sistema operacional baseado em [Unix](https://pt.wikipedia.org/wiki/Sistema_operacional_tipo_Unix#Ver_tamb.C3.A9m)

### Instalação 

Para instalar o projeto, basta executar:

```
./setup
```

### Execução 

Inicie o Jekyll:

```
bundle exec jekyll serve
```

Acesso o endereço [http://localhost:4000/]()

## Vagrant

### Requisitos

* [VirtualBox](https://www.virtualbox.org/wiki/Downloads) - 5.2.8 ou mais recente
* [Vagrant](https://www.vagrantup.com/downloads.html) - 2.0.3 ou mais recente
* [ansible](http://www.ansible.com/) - 2.4.2 ou mais recente

### Instalação

Instale os playbooks do Ansible:

```
ansible-galaxy install -r requirements.yml
```

Crie a máquina virtual utilizando o vagrant (pode demorar):

```
vagrant up
```

### Execução 

Acesse a máquina virtual:

```
vagrant ssh
```

Vá até o diretório /site:

```
cd site
```

Inicie o Jekyll (pode demorar):

```
bundle exec jekyll serve --host 0.0.0.0
```

Acesso o endereço [http://localhost:4000/]()

Pronto :)

Seja feliz
