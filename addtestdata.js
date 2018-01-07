#!/usr/bin/env nodejs

const repo = require('./services/repo.js');

const users = [
	{
		username : 'john',
		password : 'password',
	},
	{
		username : 'paul',
		password : 'password',
	},
	{
		username : 'peter',
		password : 'password',
	},
];

const talks = [
	{
		title: 'Lorem ipsum dolor sit',
		description: "Lorem ipsum dolor sit amet, alterum molestie conclusionemque an vix, nec ne tractatos similique, nonumy petentium vel et. Duo ad omnis argumentum liberavisse. Ut quando homero duo, consulatu dignissim eum ea. Vix in dicunt labitur concludaturque.\n\nVim elit reprehendunt te, recusabo atomorum vix eu. At mea purto atqui, cu alii dicam per, qui mutat nostrud ne. In vocibus facilis qualisque pro. Adhuc perfecto mediocrem no has, ut his idque choro efficiendi.",
		username: 'paul',
	},
	{
		title: 'Dicit paulo',
		description: "Dicit paulo soleat an vel. Ea quo deleniti tacimates suavitate, vel in audire albucius. Ponderum molestiae has ne, aeterno inermis verterem mei ad. Homero equidem ad mel, cum ea tantas laoreet.",
		username: 'paul',
	},
	{
		title: 'Per ad corpora albucius',
		description: "Per ad corpora albucius constituam, quot expetenda eum no, duo vitae omittam iudicabit eu. Te oratio dictas aliquid cum, ad nulla oblique veritus eam. Velit feugait accusata duo an. Movet graeci ne qui, an mutat scaevola interpretaris his, ius vitae ubique deterruisset te.\n\nHas et aliquam rationibus. Ex discere expetendis voluptatum has, mei paulo corpora scaevola id, per ut saepe graece imperdiet. Eirmod neglegentur interpretaris te has, est eu putant fabellas, ad vim mazim dolore suscipit.",
		username: 'john',
	},
	{
		title: 'Salutandi persecuti',
		description: "Salutandi persecuti sententiae eu vix. Case rebum fastidii at sed, mundi legere ius ne. At hinc omittam ocurreret quo, iriure fuisset at sea, ne labitur percipit appellantur nam.\n\nInimicus constituto eu per, his te case ipsum eleifend. Inimicus moderatius vituperata eu vis, pri cu diceret recteque mnesarchum. Eos at lucilius lobortis prodesset, ius ad illud ludus dignissim. Facete scribentur ad est, sea munere noluisse suscipiantur te..",
		username: 'peter',
	},
];

for (var i = 0; i < users.length; i++) {
	(new repo.User(users[i])).save(function() {
		console.log('1 user added');
	});	
}
for (var i = 0; i < talks.length; i++) {
	(new repo.Talk(talks[i])).save(function() {
		console.log('1 talk added');
	});	
}