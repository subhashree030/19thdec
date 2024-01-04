using { my.bookshop as my } from '../db/data-model';

service CatalogService @(requires: 'authenticated-user'){
   entity Books @(restrict: [
         {
              grant: 'READ',
              to   : 'RiskViewer'
          },
          {
             grant: [ 'READ','WRITE', 'UPDATE', 'DELETE' ],
             to   : 'RiskManager'
         }
    ])as projection on my.Books;
    
   
    @readonly entity BusinessPartners as projection on my.BusinessPartners;
    
    

}