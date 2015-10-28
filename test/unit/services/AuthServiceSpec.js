'use strict';

// a spec suite
describe("Unit: AuthService", function(){

    var Auth,
        APP_CONFIG,
        $httpBackend;

    // Set up the module
    beforeEach(module('studant'));

    beforeEach(inject(function($injector) {
        Auth = $injector.get('AuthService');
        APP_CONFIG = $injector.get('APP_CONFIG');
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it("should be defined", function(){
        expect(Auth).toBeDefined();
    });

    describe("loginWith()", function(){

        it('should send correct auth header', function(){
            $httpBackend.expectPOST(
                APP_CONFIG.API_ENDPOINT+'/api/Seeders/facebook',
                undefined,
                function(headers){
                    return headers['Satellizer'] !== 'undefined';
                }
            );
            $httpBackend.flush();
        });

        // it('should send correct payload', function(){
        //     $httpBackend.expectPOST(
        //         APP_CONFIG.API_ENDPOINT+'/api/Seeders/facebook',
        //         {
        //             'clientId',
        //             'code',
        //             'redirectUri'
        //         }
        //     );
        //   $httpBackend.flush();
        // });

        // it('should fail authentication', function(){
        //     $httpBackend.expectPOST(APP_CONFIG.API_ENDPOINT+'/api/Seeders/facebook')
        //     .respond('')
        //     // Notice how you can change the response even after it was set
        //     authRequestHandler.respond(401, '');
        //
        //     $httpBackend.expectGET('/auth.py');
        //     var controller = createController();
        //     $httpBackend.flush();
        //     expect($rootScope.status).toBe('Failed...');
        // });

    });
});
