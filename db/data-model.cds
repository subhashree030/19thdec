namespace my.bookshop;

entity Books {
  key ID : Integer;
  title  : String;
  stock  : Integer;
  bp : Association to BusinessPartners;
}


using { API_BUSINESS_PARTNER as external } from '../srv/external/API_BUSINESS_PARTNER.csn';


entity BusinessPartners as projection on external.A_BusinessPartner {
   key BusinessPartner,
   BusinessPartnerFullName as FullName,
}

