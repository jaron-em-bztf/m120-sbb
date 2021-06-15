class TestDataSet
{
    static stations = 
    [{"name":"Brig","geopos":{"long":7.9880947394,"lat":46.3194227058}},{"name":"Thun","geopos":{"long":7.62960582867,"lat":46.7548527306}},{"name":"Zürich Stadelhofen","geopos":{"long":8.54848908845,"lat":47.3666097667}},{"name":"Aarau","geopos":{"long":8.0512737187,"lat":47.3913595142}},{"name":"Neuchâtel","geopos":{"long":6.93570169412,"lat":46.9967267926}},{"name":"Winterthur","geopos":{"long":8.72382105541,"lat":47.5003338105}},{"name":"Lugano","geopos":{"long":8.94699530851,"lat":46.0055005499}},{"name":"Zürich HB","geopos":{"long":8.5402123491,"lat":47.3781766742}},{"name":"Basel SBB","geopos":{"long":7.58956279016,"lat":47.5474120551}},{"name":"Biel/Bienne","geopos":{"long":7.24291060323,"lat":47.1328978709}},{"name":"Chur","geopos":{"long":9.52893773304,"lat":46.8530841628}},{"name":"Genève","geopos":{"long":6.14245159514,"lat":46.2102128988}},{"name":"Olten","geopos":{"long":7.90769964791,"lat":47.3519347593}},{"name":"Zürich Altstetten","geopos":{"long":8.48896264996,"lat":47.3914830731}},{"name":"Zürich Oerlikon","geopos":{"long":8.54413990999,"lat":47.4115300412}},{"name":"Baden","geopos":{"long":8.30770947404,"lat":47.4764242846}},{"name":"Bern","geopos":{"long":7.43913088992,"lat":46.9488322905}},{"name":"Lausanne","geopos":{"long":6.6290923032,"lat":46.5167918355}},{"name":"Luzern","geopos":{"long":8.31018320694,"lat":47.0501778281}},{"name":"Schaffhausen","geopos":{"long":8.63275578013,"lat":47.6982815148}},{"name":"Zug","geopos":{"long":8.51504934096,"lat":47.1737069777}},{"name":"Weinfelden","geopos":{"long":9.106007813824537,"lat":47.566725926392934}},{"name":"Frauenfeld","geopos":{"long":8.896637540810797,"lat":47.55793345977253}}];

    static stationNames()
    {
      let ret = [];
      this.stations.forEach(e => ret.push(e["name"]));
      return ret;
    }

    static contains(key)
    {
      let regex = new RegExp(this.stationNames().join("|"), "i"); // arbitrary delim
      return regex.test(key);
    }

    static coords(key)
    {
      for (let e of this.stations) {
        if (e["name"].toLowerCase() == key.toLowerCase())
          return e.geopos;
      }
    }
}