(function() {

    'use strict'

    angular.module('main')
        .controller('QuestionCtrl', function($scope, $http, $uibModal, Interview) {
            var self = this;
            self.getParams = function() {
                var params = {
                    page: self.qPage,
                    psize: self.qSize,
                    psorta: self.psorta
                }
                if (!!self.qQuestion) params.qQuestion = self.qQuestion
                if (!!self.qCompany) params.qCompany = self.qCompany
                if (!!self.pSort) params.psort = self.pSort;
                return params
            }


            self.loadQuestions = function() {
                $http.get('/api/qs', {
                    params: self.getParams()
                }).success(function(data) {
                    console.log(data);
                    self.qs = data.qs;
                    self.qCount = data.count;
                }).catch(console.error)
            }

            self.psorta = 1;
            self.newQuestions = function(interview, questions) {
                $http.post('/api/qs', {
                    interview: interview,
                    questions: questions.trim().split('\n')
                }).success(function(data) {
                    self.nq = data
                }).catch(console.error)
            }

            self.showInterview = function(iid) {
                self.showInterviewDetail = Interview.get({
                    id: iid
                });
                // $uibModal.open({
                //     template: ""
                // })
            }

            self.sortBy = function(pSort) {
                self.psorta *= -1;
                self.pSort = pSort;
                self.loadQuestions();
            }

            self.init = function() {
                self.qPage = 1
                self.qSize = 10
                $scope.$watchGroup(['question.qQuestion', 'question.qCompany'], function(n, o) {
                    console.log('watch', n, o)
                    if (n == o) return;
                    console.log(n, o)
                    self.loadQuestions()
                })
                self.loadQuestions()
            }

            self.init();
        })
})()
