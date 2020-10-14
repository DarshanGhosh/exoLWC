public with sharing class exoLWC1 {
  @AuraEnabled(cacheable=true)
  public static List<Contact> getContactList(String searchTerm) {
    searchTerm = '%' + searchTerm + '%';
    return [
      SELECT Id, FirstName, LastName, Email, Phone
      FROM Contact
      WHERE FirstName LIKE :searchTerm
    ];
  }
}
