public with sharing class ExoLWC2 {
  @AuraEnabled(cacheable=true)
  public static List<Account> getAccountList() {
    return [SELECT Id, Name, Phone, Type FROM Account];
  }
}
