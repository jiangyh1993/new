(function(){
    'use strict';

    angular.module('main', [])
        .controller('UserCtrl', ['self', '$http', function(self, $http){
            var self = this;
            $http.get('/api/user').success(function(data){
                self.users = {};
                data.forEach(function(user){
                    self.users[user._id] = user;
                });
            })

            self.add = function(user) {
                delete user._id;
                $http.post('/api/user', user).success(function(data){
                    self.users[data.user._id] = data.user;
                });
            };

            self.selectUser = function(user) {
                self.newUser = angular.copy(user);
            }

            self.updateUser = function(user){
                $http.put('/api/user', user).success(function(data){
                    self.users[data.user._id] = data.user;
                });
            };

            self.del = function(uid){
                $http.delete('/api/user/'+uid).success(function(){
                    delete self.users[uid];
                });
            }
        }]);

})()
