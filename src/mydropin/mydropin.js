// 0. Get clientKey
getClientKey().then(clientKey => {
    getPaymentMethods().then(async paymentMethodsResponse => {


        const configuration = {
            environment: 'test',
            clientKey: clientKey, // Mandatory. clientKey from Customer Area
            paymentMethodsResponse,
            removePaymentMethods: ['paysafecard', 'c_cash'],
            onChange: state => {
                updateStateContainer(state); // Demo purposes only
            },
            onSubmit: (state, dropin) => {
                // state.data;
                // state.isValid;
                makePayment(state.data);
            },
        

            paymentMethodsConfiguration:{
                card: {
                    hasHolderName: true,
                    holderNameRequired: true,
                    billingAddressRequired: true, // Set to true to show the billing address input fields.
                    brands:['visa','mc'],
                    minimumExpiryDate:'03/22'
                 }
            }
        };

        // 1. Create an instance of AdyenCheckout
            const checkout = await AdyenCheckout(configuration);

            // 2. Create and mount the Component
            const dropin = checkout
                .create('dropin', {
                    // Events
                    onSelect: activeComponent => {
                        if (activeComponent.state && activeComponent.state.data) updateStateContainer(activeComponent.data); // Demo purposes only
                    }
                })
                .mount('#dropin-container');

    });
});
