# Infrastruktura GDPR Manager

## ⚠️ PRAVIDLA PRO CLAUDE

1. **Neptej se zbytečně, ale v případě nejasností se ZEPTEJ** - Tato infrastruktura je složitá a matoucí (IPv4/IPv6, VPN, port forwarding). Když si nejsi jistý, přeruš task a zeptej se uživatele, pak navázej.
2. **Neopravuj uživatele** - Pokud si myslíš, že se uživatel spletl, raději se zeptej.
3. **Testuj správně** - Když testuješ IPv4 konektivitu, používej `-4` flag, jinak může jít přes IPv6.

## Servery

### oxana.yrx.cz (tento server)
- **Hostname:** oxana.yrx.cz
- **Přístup:** pouze IPv6 (nemá veřejnou IPv4!)
- **SSH:** port 22
- **Uživatelé:** gdpr, oxana, root
- **Projekt:** /home/gdpr/project
- **SSH klíče:** 
  - /home/gdpr/.ssh/github_deploy (pro GitHub Actions)
  - /home/oxana/.ssh/ (klíče pro přístup k VPN)

### vpn.porybny.cz (VPN gateway)
- **IPv4:** 80.211.198.204
- **IPv6:** 2001:15e8:110:7d00::596
- **SSH na VPN server:** port 22
- **Port forward na oxana:** port 222 → oxana:22
- **Uživatelé:** root, oxana, michwuanquana
- **Síťová rozhraní:**
  - enx4 - IPv6 (přístup ven)
  - enx5 - veřejná IPv4 (80.211.198.204)

## Připojení

```
Internet (IPv4) → vpn.porybny.cz:222 → oxana:22
                  (80.211.198.204:222)
```

GitHub Actions se připojuje přes IPv4, proto musí jít přes VPN:
- Host: vpn.porybny.cz (nebo 80.211.198.204)
- Port: 222
- User: gdpr
- Key: secrets.SSH_PRIVATE_KEY (obsah /home/gdpr/.ssh/github_deploy)

## Domény

| Doména | Prostředí | Server |
|--------|-----------|--------|
| gdpr.yrx.cz | Development | oxana (docker-compose.dev.yml) |
| gdpr-manager.cz | Production | oxana (docker-compose.yml) |

## Aktuální problém

**VYŘEŠENO** ✅

Port forwarding na VPN serveru opraven:
```bash
iptables -t nat -A PREROUTING -i enx5 -p tcp --dport 222 -j DNAT --to-destination 10.10.10.10:22
iptables -t nat -A POSTROUTING -o wg0 -j MASQUERADE
iptables -A FORWARD -i enx5 -o wg0 -p tcp --dport 22 -d 10.10.10.10 -j ACCEPT
```
