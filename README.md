# GrenacheGrapeIsAwesome
Fun with Grenache Grape implementation from bitfinex.com

[Grenache Grape](https://github.com/bitfinexcom/grenache-grape) is awesome! It supports a distributed environment to scale and load-balance heavy computational tasks - just to name the two of its awesome features. Huge thanks to the author(s) for making their hard work public. And testable and readable too!

This distributed environment consists of peers that can communicate with each other over TCP. Each peer has a node that communicates with other nodes over UDP. The nodes support the Distributed Hash Table ([DHT](http://www.bittorrent.org/beps/bep_0005.html)) protocol that is used to store and retrieve the location pf peers. The DHT itself is based on [Kademlia](http://www.ic.unicamp.br/%7Ebit/ensino/mo809_1s13/papers/P2P/Kademlia-%20A%20Peer-to-Peer%20Information%20System%20Based%20on%20the%20XOR%20Metric%20.pdf). 
