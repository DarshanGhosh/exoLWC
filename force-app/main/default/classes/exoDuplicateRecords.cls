public with sharing class exoDuplicateRecords {
  @AuraEnabled(cacheable=true)
  public static List<DataTableWrapper> getDuplicateRecords(
    Id recordId,
    String objType
  ) {
    String query = 'SELECT Id, Name FROM ' + objType + ' WHERE Id = :recordId';
    List<SObject> obj = Database.query(query);
    List<DataTableWrapper> ret = new List<DataTableWrapper>();
    List<Datacloud.FindDuplicatesResult> results = Datacloud.FindDuplicates.findDuplicates(
      obj
    );
    for (Datacloud.FindDuplicatesResult findDupeResult : results) {
      for (
        Datacloud.DuplicateResult dupeResult : findDupeResult.getDuplicateResults()
      ) {
        for (Datacloud.MatchResult matchResult : dupeResult.getMatchResults()) {
          for (
            Datacloud.MatchRecord matchRecord : matchResult.getMatchRecords()
          ) {
            SObject objPush = matchRecord.getRecord();
            DataTableWrapper objDTW = new DataTableWrapper();
            objDTW.name = (String) objPush.get('Name');
            objDTW.nameUrl = '/' + objPush.Id;
            ret.add(objDTW);
          }
        }
      }
    }
    /*
    query =
      'SELECT Id, Name FROM ' +
      objType +
      ' WHERE Name like \'%' +
      obj.get('Name') +
      '%\'';
    List<SObject> queryResponse = Database.query(query);
    List<DataTableWrapper> ret = new List<DataTableWrapper>();
    for (SObject o : queryResponse) {
      DataTableWrapper objDTW = new DataTableWrapper();
      if (o.Id != recordId) {
        objDTW.name = (String) o.get('Name');
        objDTW.nameUrl = '/' + o.Id;
        ret.add(objDTW);
      }
    }
    */
    return ret;
  }

  private class DataTableWrapper {
    @AuraEnabled
    public String nameUrl { get; set; }
    @AuraEnabled
    public String name { get; set; }
  }
}
