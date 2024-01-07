describe('My First Test', () => {
  let data;
    before(() => {
      cy.fixture('example').then((fdata) => {
        data=fdata;
      });
    });

    it('Add to cart', () => {

      cy.on("fail",(err,runnable)=>{
        cy.log('notify user');
        return false;
      })
      cy.visit('https://www.amazon.in/')
      cy.get('#nav-link-accountList').click()
      cy.get('#ap_email').type(data.email)
      cy.get('#continue').click()
      cy.get('#ap_password').type(data.password)
      cy.get('#signInSubmit').click()
      cy.get('#twotabsearchtextbox').type(data.instock_product)
      cy.get('#nav-search-submit-button').click()
      cy.get('div[data-component-type="s-search-result"]').each($row =>{
            const val= cy.wrap($row).find('div[data-cy="title-recipe"] h2 a span').invoke('text').then(text2 => {
              let textValue2 = text2;
              //cy.log('link data '+textValue2)
              if(data.instock_product.includes(textValue2)){
                cy.log('link data '+textValue2)
                cy.wrap($row).find('div button').then($button => {
                  cy.log('verify add to cart button')
                  
                  if ($button.is(':visible')){
                    cy.wrap($button).click()
                    cy.log('added to cart')
                  }
                  
                  return false
                })

                }

              
             // cy.log('Student Name: ' + textValue2 );  
            });
           
            
      })

    })
  })
