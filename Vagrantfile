# -*- mode: ruby -*-
# vi: set ft=ruby :
VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  
  config.vm.box = "ubuntu/trusty64"
  #config.vm.network "forwarded_port", guest: 4000, host: 4000
  #config.vm.network "private_network", ip: "192.168.33.10"
  #config.vm.synced_folder ".", "/home/vagrant/"

  config.vm.provider "virtualbox" do |vb|
    # Customize the amount of memory on the VM:
    # vb.memory = "2048"
    vb.memory = "1536"
  end

  config.vm.define :site do |site_config|
    site_config.vm.hostname = "site"
    site_config.vm.network :forwarded_port, guest: 4000, host: 4000
    site_config.vm.network :private_network, ip: "192.168.33.10"
    site_config.vm.synced_folder  ".", "/home/vagrant/site"
    site_config.vm.provision 'ansible' do |ansible|
      ansible.playbook = "provisioning/playbook.yml"
      ansible.inventory_path = "provisioning/inventory"
      ansible.become = true
    end
  end
end
