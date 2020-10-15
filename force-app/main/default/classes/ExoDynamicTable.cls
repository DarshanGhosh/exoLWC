public with sharing class ExoDynamicTable {
  @AuraEnabled(cacheable=true)
  public static List<SObject> getData(
    String objName,
    List<String> fields,
    String filter
  ) {
    String query = 'SELECT ';
    for (Integer i = 0; i < fields.size(); i++) {
      query += i != fields.size() - 1 ? fields[i] + ', ' : fields[i] + ' ';
    }
    query += 'FROM ' + objName;
    query += filter != null ? ' ' + filter : '';
    return Database.query(query);
  }
}
