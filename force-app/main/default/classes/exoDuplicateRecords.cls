public with sharing class exoDuplicateRecords {
  @AuraEnabled(cacheable=true)
  public static List<SObject> getDuplicateRecords(
    Id recordId,
    String objType,
    List<String> fields
  ) {
    String query = 'SELECT Id FROM ' + objType + ' WHERE Id = :recordId';
    List<SObject> obj = Database.query(query);
    List<Id> listId = new List<Id>();
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
            listId.add((Id) matchRecord.getRecord().get('Id'));
          }
        }
      }
    }
    String queryFields = '';
    for (Integer i = 0; i < fields.size(); i++) {
      queryFields += i != fields.size() - 1 ? fields[i] + ', ' : fields[i];
    }
    String finalQuery =
      'SELECT ' +
      queryFields +
      ' FROM ' +
      objType +
      ' WHERE Id in :listId';
    return Database.query(finalQuery);
  }
}
