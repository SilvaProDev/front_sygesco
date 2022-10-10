import Vue from "vue";

import VueRouter from "vue-router";
import Dashbord from "../pages/milieu/Dashbord.vue"
import Redirection from "../pages/milieu/Redirection.vue"
import BilanAnne from "../pages/milieu/BilanAnne.vue"
import BilanAnneeRgister from "../pages/milieu/BilanAnneeRgister.vue"
import Entete from "../pages/milieu/Entete.vue"
import EnteteConfig from "../pages/milieu/EnteteConfig.vue"
import EnteteConfigMod from "../pages/milieu/EnteteConfigMod.vue"
import Caroussel from "../pages/milieu/Caroussel.vue"
import inscription from "../pages/milieu/eleves/inscription.vue"
import editStudent from "../pages/milieu/eleves/editStudent.vue"
import ListeDesEleves from "../pages/milieu/eleves/ListeDesEleves.vue"
import DetailEleve from "../pages/milieu/eleves/DetailEleve.vue"
import InfoEleve from "../pages/milieu/eleves/InfoEleve.vue"
import DetailParentEleve from "../pages/milieu/eleves/DetailParentEleve.vue"
import NotesEleve from "../pages/milieu/eleves/NotesEleve.vue"
import ScolariteStatistique from "../pages/milieu/eleves/ScolariteStatistique.vue"
import ScolariteEtat from "../pages/milieu/eleves/ScolariteEtat.vue"
import ScolaritePaiement from "../pages/milieu/eleves/ScolaritePaiement.vue"
import DetailNoteIndividuelle from "../pages/milieu/eleves/DetailNoteIndividuelle.vue"
import NotesGroupe from "../pages/milieu/eleves/NotesGroupe.vue"
import NotesDetail from "../pages/milieu/eleves/NotesDetail.vue"
import Cantine from "../pages/milieu/eleves/Cantine.vue"
import AjouterAccueil from "../pages/accueil/AjouterAccueil.vue"
import AfficheAccueil from "../pages/accueil/AfficheAccueil.vue"
import ModifierAccueil from "../pages/accueil/ModifierAccueil.vue"
import Bulletin from "../pages/milieu/eleves/Bulletin.vue"
import PayerCantine from "../pages/milieu/eleves/PayerCantine.vue"
import Insertion from "../pages/milieu/Livret/Insertion.vue"
import Livret from "../pages/milieu/Livret/Livret.vue"
import Configuration from "../pages/milieu/Livret/Configuration.vue"
//import Transport from "../pages/milieu/eleves/Transport.vue"
import Annee from "../pages/parametre/Annee.vue"
import Niveau from "../pages/parametre/Niveau.vue"
import Semestre from "../pages/parametre/Semestre.vue"
import Matiere from "../pages/parametre/Matiere.vue"
import ListeDeClasse from "../pages/parametre/ListeDeClasse.vue"
import ListeDeMatiere from "../pages/parametre/ListeDeMatiere.vue"
import NouvelleMatiere from "../pages/parametre/NouvelleMatiere.vue"
import Classe from "../pages/parametre/Classe.vue"
import Utilisateur from "../pages/personnel/Utilisateur.vue"
import Role from "../pages/parametre/Role.vue"
import NotificationSms from "../pages/parametre/NotificationSms.vue"
import NotificationEmail from "../pages/parametre/NotificationEmail.vue"
import TransportPaiement from "../pages/parametre/TransportPaiement.vue"
import TransportStatistique from "../pages/parametre/TransportStatistique.vue"
 import Login from "../pages/personnel/Login.vue"
 import Permission from "../pages/personnel/Permission.vue"
 import Profile from "../pages/personnel/users/Profile.vue"
 import UserOnline from "../pages/personnel/users/UserOnline.vue"
 import UpdateProfile from "../pages/personnel/users/UpdateProfile.vue"
 import Affectation from "../pages/personnel/Affectation.vue"
 import AffectationModification from "../pages/personnel/AffectationModification.vue"
 import i18n from '../i18n'


Vue.use(VueRouter)

const routes = [
    {
        path:'/',
        redirect: `/${i18n.locale}/`
    },
   
    {
        path: '/:lang',
        component: {
          render (c) { return c('router-view') }
        },
        children:[
            {
                path:"",
                name:"Redirection",
                component:Redirection
            },
           
            {
                path: 'Bilan-annee',
                name: 'BilanAnne',
                component: BilanAnne,
                meta: {
                    requiresAuth: true
                }
              },
            {
                path: 'Bilan-annee-configuration',
                name: 'BilanAnneeRgister',
                component: BilanAnneeRgister,
                meta: {
                    requiresAuth: true
                }
              },
            {
                path: 'accueil',
                name: 'Caroussel',
                component: Caroussel,
                meta: {
                    requiresAuth: true
                }
              },
            {
                path:"entete",
                name:"Entete",
                component:Entete,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path:"modification-entete/:id",
                name:"EnteteConfigMod",
                component:EnteteConfigMod,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path:"info-eleve/:id",
                name:"InfoEleve",
                component:InfoEleve,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path:"detail-parent-info-eleve/:id",
                name:"DetailParentEleve",
                component:DetailParentEleve,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path:"configuration-entete",
                name:"EnteteConfig",
                component:EnteteConfig,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path:"dashbord",
                name:"Dashbord",
                component:Dashbord,
                meta: {
                    requiresAuth: true
                }
            },
            // {
            //     path:"Login-home-page",
            //     name:"Redirection",
            //     component:Redirection
            // },
            {
                path:"statistique-de-la-scolarite",
                name:"ScolariteStatistique",
                component:ScolariteStatistique,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path:"paiement-de-la-scolarite",
                name:"ScolaritePaiement",
                component:ScolaritePaiement,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path:"etat-de-paiement-de-la-scolarite",
                name:"ScolariteEtat",
                component:ScolariteEtat,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path:"niveau",
                name:"Niveau",
                component:Niveau,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path:"Liste-de-classe/:id",
                name:"ListeDeClasse",
                component:ListeDeClasse,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path:"Liste-de-matiere/:id",
                name:"ListeDeMatiere",
                component:ListeDeMatiere,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path:"matieres",
                name:"Matiere",
                component:Matiere,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path:"nouvelle-matiere",
                name:"NouvelleMatiere",
                component:NouvelleMatiere,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path:"semestre",
                name:"Semestre",
                component:Semestre,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path:"Annee-scolaire",
                name:"AnneeScolaire",
                component:Annee,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path:"gestion-des-utilisateurs",
                name:"Utilisateur",
                component:Utilisateur,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path:"gestion-des-roles",
                name:"Role",
                component:Role,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path:"classe",
                name:"Classe",
                component:Classe,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path:"notification-email",
                name:"NotificationEmail",
                component:NotificationEmail,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path:"paiement-transport",
                name:"TransportPaiement",
                component:TransportPaiement,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path:"statistique-transport",
                name:"TransportStatistique",
                component:TransportStatistique,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path:"affectation/:id",
                name:"Affectation",
                component:Affectation,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path:"modifier-affectation/:id",
                name:"AffectationModification",
                component:AffectationModification,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path:"update-profile-user/:id",
                name:"UpdateProfile",
                component:UpdateProfile,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path:"profile-user",
                name:"Profile",
                component:Profile,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path:"user-online",
                name:"UserOnline",
                component:UserOnline,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path:"permission",
                name:"Permission",
                component:Permission,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path:"connexion",
                name:"LoginUser",
                component:Login,
                meta: {
                    requiresAuth: true
                },
                props: true 
            },
            {
                path:"notification-sms",
                name:"NotificationSms",
                component:NotificationSms,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path:"Liste-des-eleves",
                name:"ListeDesEleves",
                component:ListeDesEleves,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path:"payer-cantine",
                name:"PayerCantine",
                component:PayerCantine,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path:"nouvelle-insertion-de-livret-de-competence",
                name:"Insertion",
                component:Insertion,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path:"voir-livret-de-competence",
                name:"Livret",
                component:Livret
            },
            {
                path:"Configuration-livret",
                name:"Configuration",
                component:Configuration,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path:"Ajouter-configiguration-accueil",
                name:"AjouterAccueil",
                component:AjouterAccueil
            },
            {
                path:"Modifier-Accueil/:id",
                name:"ModifierAccueil",
                component:ModifierAccueil
            },
            {
                path:"Afficher-Accueil",
                name:"AfficheAccueil",
                component:AfficheAccueil
            },
            {
                path:"cantine",
                name:"Cantine",
                component:Cantine
            },
            {
                path:"bulletin-eleve/:id",
                name:"Bulletin",
                component:Bulletin
            },
            
            {
                path:"detail",
                name:"NotesDetail",
                component:NotesDetail
            },
            {
                path:"Ajouter-la-note-grouper",
                name:"NotesGroupe",
                component:NotesGroupe
            },
            {
                path:"Ajouter-la-note",
                name:"NotesEleve",
                component:NotesEleve
            },
            {
                path:"Detail-note-individuelle/:id",
                name:"DetailNoteIndividuelle",
                component:DetailNoteIndividuelle
            },
            {
                path:"Detail-de-eleve/:id",
                name:"DetailEleve",
                component:DetailEleve
            },
            {
                path:"modification-eleve/:id",
                name:"editStudent",
                component:editStudent
            },
            {
                path:"inscription-eleves",
                name:"inscription",
                component:inscription
            },
            {
                path: '*',
                redirect: '/'
            }
            
        ]
    }
]


const router = new VueRouter({
    mode:'history',
    routes
})

export default router