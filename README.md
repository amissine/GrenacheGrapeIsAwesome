# GrenacheGrapeIsAwesome
Fun with Grenache Grape implementation from bitfinex.com

[Grenache Grape](https://github.com/bitfinexcom/grenache-grape) is awesome! It supports a distributed environment to scale and load-balance heavy computational tasks - just to name the two good reasons to use it. Huge thanks to the author(s) for making their hard work public, testable, and readable!

This distributed environment (the cloud) consists of peers that can communicate with each other over TCP. Each peer has a node that communicates with other nodes over UDP. The nodes support the Distributed Hash Table ([DHT](http://www.bittorrent.org/beps/bep_0005.html)) protocol that is used to store and retrieve the location of peers. The DHT itself is based on [Kademlia](http://www.ic.unicamp.br/%7Ebit/ensino/mo809_1s13/papers/P2P/Kademlia-%20A%20Peer-to-Peer%20Information%20System%20Based%20on%20the%20XOR%20Metric%20.pdf).

To locate a peer, we need to locate its node. Let us take a look at an example of the node lookup. To do so, run

```bash
DEBUG='ggia:*,grenache:grape,bittorrent-dht' npm start example1
```

It outputs the debug information from `example1` and from the modules in use - `grenache-grape` and `bittorrent-dht`. I saved the output into [this Google document](https://docs.google.com/document/d/1qqULcyuq26l3t1Gcs_9qCsxkYqQMqNBdX-A81Sz2bFY/edit). The example demonstrates a simple way to create a Kademlia cloud of nodes and to grow it as needed. The first node in the cloud (the known node) does not bootstrap, since there are no more nodes to bootstrap to at the moment. The second and all subsequent nodes bootstrap to the known node. All they know before joining the cloud is the IP address and the port number of the known node. As they join the cloud, they learn about each other. It's fun to look at the output and see how this happens. We begin with a single (known) node that is listening on 127.0.0.1:20001,

```
  grenache:grape starting +0ms
  bittorrent-dht [aaede18] new DHT aaede1831b204a0a37a35c96efbd53c27723fb0b +0ms
  bittorrent-dht [aaede18] listening 20001 +15ms
  grenache:grape 20001 listening +25ms
  bittorrent-dht [aaede18] emit ready +6ms
  grenache:grape 20001 ready +5ms
```

, then add the second and the third nodes:

```
  grenache:grape starting +2ms
  bittorrent-dht [4123714] new DHT 41237145d4b64cafd26e73500fe9cba2b61a83f0 +3ms
  bittorrent-dht [4123714] listening 20002 +4ms
  grenache:grape 20002 listening +5ms

  grenache:grape starting +2ms
  bittorrent-dht [1cd666c] new DHT 1cd666c883a1e5236209a24ab57ef08cc9752c3c +2ms
  bittorrent-dht [1cd666c] listening 20003 +0ms
  grenache:grape 20003 listening +1ms
  ggia:example1 grape started on port 20003, stopping in 10000 ms +0ms
```

When a node joins the Kademlia cloud, it sends the node lookup request to the node(s) it knows of. This is what the second and the third nodes are doing here:

```
  grenache:grape 20001 node +3ms
  ggia:util { port: 20002, distance: 0 } +1ms
  bittorrent-dht [aaede18] received find_node query from 127.0.0.1:20002 +6ms
  grenache:grape 20001 node +6ms
  ggia:util { port: 20003, distance: 0 } +0ms
  bittorrent-dht [aaede18] received find_node query from 127.0.0.1:20003 +6ms
  grenache:grape 20002 node +3ms
  ggia:util { port: 20001, distance: 0 } +0ms
  bittorrent-dht [4123714] emit ready +2ms
  grenache:grape 20002 ready +0ms
  grenache:grape 20003 node +3ms
  ggia:util { port: 20001, distance: 0 } +1ms
  grenache:grape 20002 node +0ms
  ggia:util { port: 20003, distance: 0 } +0ms
  bittorrent-dht [4123714] received find_node query from 127.0.0.1:20003 +4ms
  grenache:grape 20003 node +1ms
  ggia:util { port: 20002, distance: 0 } +0ms
  bittorrent-dht [1cd666c] emit ready +1ms
  grenache:grape 20003 ready +0ms
```
