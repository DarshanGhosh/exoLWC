public with sharing class exoDuplicateRecords {
  @AuraEnabled(cacheable=true)
  public static List<DataTableWrapper> getDuplicateRecords(
    Id recordId,
    String objType
  ) {
    String query = 'SELECT Id, Name FROM ' + objType + ' WHERE Id = :recordId';
    SObject obj = Database.query(query);
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
    return ret;
  }

  private class DataTableWrapper {
    @AuraEnabled
    public String nameUrl { get; set; }
    @AuraEnabled
    public String name { get; set; }
  }
}
