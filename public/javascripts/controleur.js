monApp = angular.module('monApp', []);


// Controleur pour la validation du formulaire côté client.
monApp.controller('Controleur', function($scope, $http) {
    $scope.discipline = [
        {id: 1, label: "Camouflage", value: "camouflage"},
        {id: 2, label: "Chasse", value: "chasse"},
        {id: 3, label: "Sixième Sens", value: "sixiemeSens"},
        {id: 4, label: "Orientation", value: "orientation"},
        {id: 5, label: "Guérison", value: "guerison"},
        {id: 6, label: "Maitrise d'armes", value: "maitriseArmes"},
        {id: 7, label: "Bouclier Psychique", value: "bouclierPsychique"},
        {id: 8, label: "Puissance Psychique", value: "puissancePsychique"},
        {id: 9, label: "Communication Animale", value: "communicationAnimale"},
        {id: 10, label: "Maitrise Psychique de la Matière", value: "maitrisePsychiqueMatiere"}
    ];

    $scope.objets = [
        {id: 1, label: "Épée (Arme)", value: "epee", name: "arme"},
        {id: 2, label: "Sabre (Arme)", value: "sabre", name: "arme"},
        {id: 3, label: "Lance (Arme)", value: "lance", name: "arme"},
        {id: 4, label: "Masse d'Arme (Arme)", value: "masseArme", name: "arme"},
        {id: 5, label: "Marteau de Guerre (Arme)", value: "marteauGuerre", name: "arme"},
        {id: 6, label: "Hâche (Arme)", value: "hache", name: "arme"},
        {id: 7, label: "Bâton (Arme)", value: "baton", name: "arme"},
        {id: 8, label: "Glaive (Arme)", value: "glaive", name: "arme"},
        {id: 9, label: "Gilet de Cuir Martelé (Objet Spécial)", value: "giletCuirMertele", name: "objetSpecial"},
        {id: 10, label: "Potion de Lampsur (Objet dans le sac à dos)", value: "potionLampsur", name: "objet"},
        {id: 11, label: "Rations spéciales (Objet dans le sac à dos)", value: "rationsSpeciales", name: "objet"}
    ];

    $scope.validateForm = function(){
        var selectedDisciplines = 0;
        angular.forEach($scope.discipline, function(disc){
            selectedDisciplines += disc.selected ? 1 : 0;
        })

        var selectedObjects = 0;
        angular.forEach($scope.objets, function(o){
            selectedObjects += o.selected ? 1 : 0;
        })

        if(selectedDisciplines == 5 && selectedObjects == 2){
            return true;
        } else {
            return false;
        }
    };

});

// Controleur pour afficher les parties courantes lors de la création de personnages.
monApp.controller('ControleurPartieEnCours', function($scope, $http) {
    $scope.partiesCourantes = [];
    $http.get('/api/joueurs/').then(
        function(tableJoueurs) {
            tableJoueurs.data.map(function(joueur){ 
                $http.get('/api/joueurs/avancement/' + joueur._id).then(
                    function(avancement){
                        $scope.partiesCourantes.push({  id: joueur._id,
                                                        nomJoueur: joueur.nom,
                                                        pageCourante: avancement.data.pageId});
                    }, 
                    function(res){
                        console.log('erreur de récupération de lavancement du joueur');
                    }
                );
            });
        },
        function(res) {
            console.log('erreur de laffichage des parties');
        }
    );

    $scope.supprimerPartie = function(id){
        $http.delete('/api/joueurs/' + id).then(
            function(res) {
                var indexPartie = $scope.partiesCourantes.indexOf($scope.partiesCourantes.filter(
                    function(partie) {
                        return partie.id === id;
                    }
                )[0]);

                if(index > -1){
                    $scope.partiesCourantes.splice(indexPartie, 1);
                }
            },
            function(res){
                console.log('erreur boutton supprimer de partie');            
            }
        );
    };
});


monApp.controller('ControleurHistoire', function($scope, $http) { 
    $scope.histoire = "";
    $scope.goToPage = function(pageId){
        $http.get('/jeu/' + pageId).then(
            function(res) {
                $scope.histoire = res.data;
                console.log($scope.histoire);
            },
            function(res){
                console.log("erreur lors de la récupération de la page");
            }
        );
    };
});


