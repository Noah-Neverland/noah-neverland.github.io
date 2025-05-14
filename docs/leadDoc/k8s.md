---
title: 前端文档doc
editLink: true
---

# Kubernetes

## 一、总揽

- 基于 ubuntu24.04
- k8s 集群至少准备 3 台机器，一台 master，两台 worker。

## 二、ubuntu 系统初始化配置

IP 规划  
准备 root 用户  
设置主机名  
域名写入 host 文件  
时间同步  
配置内核转发和网桥过滤  
安装 ipvs  
关闭 swap 分区

## 三、安装容器运行时

```js
// 首先安装容器依赖项
apt install -y curl gnupg2 software-properties-common apt-transport-https ca-certificates
// 添加 containerd 存储库
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmour -o /etc/apt/trusted.gpg.d/containerd.gpg

add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"

// 安装containerd.io
apt install containerd.io -y

// 配置 containerd 使用 SystemdCgroup
containerd config default |  tee /etc/containerd/config.toml >/dev/null 2>&1
// 命令式修改
sed -i 's/SystemdCgroup \= false/SystemdCgroup \= true/g' /etc/containerd/config.toml
// 进入文件修改
vim /etc/containerd/config.toml
// 修改沙箱版本
sandbox_image = "registry.aliyuncs.com/google_containers/pause:3.10"

// 配置 containerd 开机启动,并启动containerd
systemctl enable containerd --now
```

## 四、安装&部署 k8s 集群

基本工具

```js
apt update

apt install -y apt-transport-https ca-certificates curl gpg
```

添加 Kubernetes Package Repository

```js
// 提示curl: (7) Failed to connect to prod-cdn.packages.k8s.io port 443 after 75048 ms: Couldn't connect to server gpg: 找不到有效的 OpenPGP 数据
// 换成阿里的地址

curl -fsSL https://mirrors.tuna.tsinghua.edu.cn/kubernetes/core:/stable:/v1.32/deb/Release.key | sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg

echo 'deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://mirrors.tuna.tsinghua.edu.cn/kubernetes/core:/stable:/v1.32/deb/ /' | sudo tee /etc/apt/sources.list.d/kubernetes.list

// 源
curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.32/deb/Release.key | sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg

echo 'deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/v1.32/deb/ /' | sudo tee /etc/apt/sources.list.d/kubernetes.list
```

安装 Kubernetes 部件 (Kubeadm, kubelet & kubectl)

```js
apt-get install -y kubelet kubeadm kubectl
```

初始化集群

- 方法一：生成配置文件

```js
// 在主机节点拉取所需镜像
kubeadm config images pull --image-repository=registry.aliyuncs.com/google_containers --kubernetes-version=v1.32.3
// 生成默认配置文件配置
kubeadm config print init-defaults > kubeadm.yaml
// 修改配置文件
apiVersion: kubeadm.k8s.io/v1beta4
bootstrapTokens:
- groups:
  - system:bootstrappers:kubeadm:default-node-token
  token: abcdef.0123456789abcdef
  ttl: 24h0m0s
  usages:
  - signing
  - authentication
kind: InitConfiguration
localAPIEndpoint:
  advertiseAddress: 10.211.55.6
  bindPort: 6443
nodeRegistration:
  criSocket: unix:///var/run/containerd/containerd.sock
  imagePullPolicy: IfNotPresent
  imagePullSerial: true
  name: k8smaster
  taints: null
timeouts:
  controlPlaneComponentHealthCheck: 4m0s
  discovery: 5m0s
  etcdAPICall: 2m0s
  kubeletHealthCheck: 4m0s
  kubernetesAPICall: 1m0s
  tlsBootstrap: 5m0s
  upgradeManifests: 5m0s
---
apiServer: {}
apiVersion: kubeadm.k8s.io/v1beta4
caCertificateValidityPeriod: 87600h0m0s
certificateValidityPeriod: 8760h0m0s
certificatesDir: /etc/kubernetes/pki
clusterName: kubernetes
controllerManager: {}
dns: {}
encryptionAlgorithm: RSA-2048
etcd:
  local:
    dataDir: /var/lib/etcd
imageRepository: registry.aliyuncs.com/google_containers
kind: ClusterConfiguration
kubernetesVersion: 1.32.3
networking:
  dnsDomain: cluster.local
  podSubnet: 10.224.0.0/16
  serviceSubnet: 10.96.0.0/12
proxy: {}
scheduler: {}
---
apiVersion: kubeproxy.config.k8s.io/v1beta4
kind: KubeProxyConfiguration
mode: ipvs
---
apiVersion: kubelet.config.k8s.io/v1beta4
kind: KubeletConfiguration
cgroupDriver: systemd
                        
// 通过配置文件初始化 Kubernetes集群
kubeadm init --config=kubeadm.yaml
```

- 方法二：手动配置

```js
kubeadm init --kubernetes-version=1.32.3 --control-plane-endpoint=k8smaster --apiserver-advertise-address=10.211.55.6 --pod-network-cidr=10.244.0.0/16 --service-cidr=10.96.0.0/12 --image-repository=registry.aliyuncs.com/google_containers --cri-socket=unix:///var/run/containerd/containerd.sock --upload-certs --v=9

// kubernetes-version：指定k8s的版本，我这里是1.32.2，你的也许是1.31.1-1.1等
// control-plane-endpoint：可以理解为集群master的命名，随意写即可
// apiserver-advertise-address：集群中master的地址！注意不要抄，写你自己虚拟机的ip地址
// pod-network-cidr：pod网段地址，4.6.1已经规划过了，只要不与集群网段和service网段重复即可
// service-cidr：service网段地址，4.6.1已经规划过了，只要不与集群网段和pod网段重复即可
// image-repository：指定使用国内镜像
// cri-socket：指定使用的容器运行时，如果你使用的containerd容器，那就不用写这个参数
// v：日志级别，9表示输出的信息会很详细
```

containerd 运行报错请输入以下命令

```js
journalctl -xeu containerd.service
```

初始化成功后，在 master 节点执行

```js
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config

systemctl restart containerd
// 查看加入节点的命令
kubeadm token create --print-join-command
// 在要加入的节点上执行以下命令(下面的代码只是例子，复制最后输出的结果)
kubeadm join 10.211.55.6:6443 --token abcdef.0123456789abcdef --discovery-token-ca-cert-hash sha256:8a8726500c529481a6ab4fa4e0a296ed9601efdafa38bccf4808cb360eb4a65a
```

安装 calico

```js
kubectl create -f https://raw.githubusercontent.com/projectcalico/calico/v3.29.2/manifests/tigera-operator.yaml

wget https://raw.githubusercontent.com/projectcalico/calico/v3.29.2/manifests/custom-resources.yaml

vim custom-resources.yaml
// 修改pod网段 cidr: 10.244.0.0/16
kubectl create -f custom-resources.yaml
// 检查calico是否运行成功
kubectl get pod -n calico-system

// 检查现有资源
kubectl get all -n tigera-operator
// 删除命名空间
kubectl delete namespace tigera-operator
// 删除特定资源
kubectl delete deployment -n tigera-operator <deployment-name>
kubectl delete service -n tigera-operator <service-name>
// 删除所有 Calico CRD
kubectl get crds | grep projectcalico.org | awk '{print $1}' | xargs kubectl delete crd

// 完全删除 Calico/Tigera
kubectl delete -f https://raw.githubusercontent.com/projectcalico/calico/v3.29.2/manifests/tigera-operator.yaml
```

## 回退 k8s 集群/重置 k8s 集群

k8s 安装步骤确实繁琐，可能我们某一步错了，或者遇到各种问题，都得重头再来太麻烦。这时我们可以使用 kubeadm 提供的 reset 命令来回退集群。

```js
kubeadm reset

rm -rf /root/.kube
rm -rf /etc/cni/net.d
rm -rf /etc/kubernetes/*

systemctl restart containerd/docker(区分容器运行时)

// 子node清理现有 Kubernetes 配置
kubeadm reset
rm -rf /etc/kubernetes /var/lib/kubelet /var/lib/etcd
```

> 参考文档:  
[https://juejin.cn/post/7473838374366347303#heading-31](https://juejin.cn/post/7473838374366347303#heading-31) [https://blog.csdn.net/qq_51773218/article/details/142130434](https://blog.csdn.net/qq_51773218/article/details/142130434)  
[k8s搭建的一些问题记录](https://blog.csdn.net/master_boy/article/details/127148422)
