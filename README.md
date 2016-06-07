# 1dv450-client  
http://ad222kr.github.io/

## Installationsanvisningar
Skulle du vilja köra applikationen lokalt måste dessa dessa steg följas  
* Installera node om du inte har det
* Klona ner repot
* ``` npm install http-server -g ```
* ``` cd 1dv450-client ```
* ``` npm install ```
* ``` http-server ```
* Nu finns applikationen på localhost:8080

## Uppgifter
För att logga in och testa applikationen används dessa uppgifter  
username: testcreator@example.com  
password: testcreatorpassword




## Ändringar gjorda i API-t under utveckling av klient-applikation
* Vid tillägg av tag till en pub så kollar API:t först om en tag med samma namn redan finns. I så fall används den, annars skapas en ny.
* La till route och action för att kunna hämta en användarees pubar med en email-param.
  Eftersom jag sparar email i användarinfo vid inlogg så kändes det som det enklaste sättet att implentera detta då jag vill kunna ha en vy med resurser som den inloggade användaren har skapat. Borde kanske egentligen sparat användarens ID och sen skickat med id som parameter istället
* Fick lägga till stöd för PUT-requests eftersom jag glömde det inledningsvis.
* Var tvungen att nedgradera active-model-serializers gemet eftersom en uppdatering tog sönder allt.
* Ändrade json-attributet errors till error om bara ett fel uppstått (dvs ej om fler valideringar på en model inte gick igenom) för att enklare hämta och presentera felmeddelanden i klientapplikationen
