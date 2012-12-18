function EventsCtrl( $scope, $filter, echidnaService ) {
  $scope.items = [{"id":"7a4aa674ad44095dfdc2f55c724a4b6391387e060ef41b37e8a139c2419eae73","node_id":"3c2260189e68bdf0deede9a61b6c475072b22e9af3fb589f985250e31bba137b","evt_corr_id":"ecdb24aa61bd8cdfe87af9d674884b3ee744ad4e591cb86392c095008d17437b","ssn_corr_id":"5c28696616abaa74ea6644b6b24fec2a12e39daa849c1aa567d1140cb6e5afd9","net_version":4,"net_src_ip":"10.12.3.32","net_src_port":57465,"net_dst_ip":"10.14.2.56","net_dst_port":5500,"net_protocol":6,"timestamp":"2009-08-03 05:22:57","sig_type":1,"sig_id":17335,"sig_revision":2,"sig_category":"0","sig_priority":1,"classification":0,"sig_message":"indicator-shellcode x86 os agnostic fnstenv geteip byte xor decoder"},
{"id":"7a4b048b9c78f59f99e71515985faf25f5ec76e76c957f083551fcd37cad82eb","node_id":"3c2260189e68bdf0deede9a61b6c475072b22e9af3fb589f985250e31bba137b","evt_corr_id":"0c551f98429300959baa067fc62ac1c79a150b10c6a0cb960e0874ba1240e994","ssn_corr_id":"3c96dac7e4458433ac7c9a39a5def68810654b5880d8a23fb7c988d8b5cb14b6","net_version":4,"net_src_ip":"10.12.3.32","net_src_port":63994,"net_dst_ip":"10.14.2.56","net_dst_port":4343,"net_protocol":6,"timestamp":"2009-08-02 12:12:45","sig_type":1,"sig_id":17335,"sig_revision":2,"sig_category":"0","sig_priority":1,"classification":0,"sig_message":"indicator-shellcode x86 os agnostic fnstenv geteip byte xor decoder"},
{"id":"7a4bbbc0090958c26728271360f6512ebeec1d6e62dfbacfc628f2e935683f28","node_id":"3c2260189e68bdf0deede9a61b6c475072b22e9af3fb589f985250e31bba137b","evt_corr_id":"760bbf0f206870f0923531201cd71c2617ab9a1bd419d2c209d4fa55860ca726","ssn_corr_id":"14e46cec29c4cd7b7d80b5bd84a16cc62dd89a89841a84dc0ee1d76254a74332","net_version":4,"net_src_ip":"10.12.3.32","net_src_port":61827,"net_dst_ip":"10.14.2.56","net_dst_port":5500,"net_protocol":6,"timestamp":"2009-08-03 05:07:01","sig_type":1,"sig_id":17335,"sig_revision":2,"sig_category":"0","sig_priority":1,"classification":0,"sig_message":"indicator-shellcode x86 os agnostic fnstenv geteip byte xor decoder"},
{"id":"7a4c1fed14531d83fa315e24de3b8e7fd90d6740623e6aab26dea357f5fd9803","node_id":"3c2260189e68bdf0deede9a61b6c475072b22e9af3fb589f985250e31bba137b","evt_corr_id":"7228ab667073f8d975debfe947bee6f06ff7f235ab5552974c0736c5fc991b53","ssn_corr_id":"65cf212d9bd2fea42d9e541a39b8f577075d63d51f51ee1bd831ca1a6311f264","net_version":4,"net_src_ip":"10.12.3.32","net_src_port":56933,"net_dst_ip":"10.14.2.56","net_dst_port":4343,"net_protocol":6,"timestamp":"2009-08-02 14:20:45","sig_type":1,"sig_id":17335,"sig_revision":2,"sig_category":"0","sig_priority":1,"classification":0,"sig_message":"indicator-shellcode x86 os agnostic fnstenv geteip byte xor decoder"},
{"id":"7a4c3509eefd7ee4ace4681e201c3d6e7d6c5bcaee0f9c635552c96a65bd11f3","node_id":"3c2260189e68bdf0deede9a61b6c475072b22e9af3fb589f985250e31bba137b","evt_corr_id":"d2a1f49a24d68fdc47c5284ed93940ca931bddb838bf830e01303f591ce682c4","ssn_corr_id":"32511003915c72e23fce7e0fa75551c99198b5a649f7a75bebd99da6b281f8c0","net_version":4,"net_src_ip":"10.12.3.32","net_src_port":61879,"net_dst_ip":"10.14.2.56","net_dst_port":4343,"net_protocol":6,"timestamp":"2009-08-02 14:35:28","sig_type":1,"sig_id":17335,"sig_revision":2,"sig_category":"0","sig_priority":1,"classification":0,"sig_message":"indicator-shellcode x86 os agnostic fnstenv geteip byte xor decoder"},
{"id":"7a4c390ebfac60264df54e8bbfaaad1aa78101b379146284baf4f0159b94f15b","node_id":"3c2260189e68bdf0deede9a61b6c475072b22e9af3fb589f985250e31bba137b","evt_corr_id":"a0bc1568f7937c66ba59cef26588be1cd0ba229c14f3f639562c5efce3a14c82","ssn_corr_id":"95117fbe8ab591f9694acdff9ea3d9aaacbe3db34bd5d724e5073b982e6675ac","net_version":4,"net_src_ip":"10.12.3.32","net_src_port":55148,"net_dst_ip":"10.14.2.56","net_dst_port":5500,"net_protocol":6,"timestamp":"2009-08-03 03:57:31","sig_type":1,"sig_id":17335,"sig_revision":2,"sig_category":"0","sig_priority":1,"classification":0,"sig_message":"indicator-shellcode x86 os agnostic fnstenv geteip byte xor decoder"},
{"id":"7a4c78f5d0a60e1b6e62fd54d66e4b9089599051d130d98cf37427c79e271d09","node_id":"3c2260189e68bdf0deede9a61b6c475072b22e9af3fb589f985250e31bba137b","evt_corr_id":"700fbdf0816e234aa60cb3076867ad40b9cafd1c2cd95d07a4821c9a0c96558c","ssn_corr_id":"d08f6855da70d356e8451b031e793ca873e9cb3af76c329755d5a7b074cd35be","net_version":4,"net_src_ip":"10.12.3.32","net_src_port":52469,"net_dst_ip":"10.14.2.56","net_dst_port":4343,"net_protocol":6,"timestamp":"2009-08-02 14:43:59","sig_type":1,"sig_id":17335,"sig_revision":2,"sig_category":"0","sig_priority":1,"classification":0,"sig_message":"indicator-shellcode x86 os agnostic fnstenv geteip byte xor decoder"},
{"id":"7a4c803bec5e50a09d9aeaa8e0e2d10ac4f238d4fff0f9c5135dac79dff445b9","node_id":"3c2260189e68bdf0deede9a61b6c475072b22e9af3fb589f985250e31bba137b","evt_corr_id":"0ae56c08899f04435e7dadf89ddc554c98bea51442bbde72c0c685431482c501","ssn_corr_id":"c5369ac62c3b1a64e67bf51bce2183c060ab61fd74dab4313fada7bb3fcd5d09","net_version":4,"net_src_ip":"10.12.3.32","net_src_port":58950,"net_dst_ip":"10.14.2.56","net_dst_port":1787,"net_protocol":6,"timestamp":"2009-08-02 12:35:32","sig_type":1,"sig_id":17335,"sig_revision":2,"sig_category":"0","sig_priority":1,"classification":0,"sig_message":"indicator-shellcode x86 os agnostic fnstenv geteip byte xor decoder"},
{"id":"7a4c8d1457a3aa378ece5e7300dc46eae4340b391ab10a2824d668caf58899ef","node_id":"3c2260189e68bdf0deede9a61b6c475072b22e9af3fb589f985250e31bba137b","evt_corr_id":"4fcfbfab0b759240c2e658ff6de7a9d5cd0e6526721f74074f3cd1390642c0c4","ssn_corr_id":"dd00a7206c0dc5ae17e8bc0d6fed0d7f709054becfb39be16604759bcbdea734","net_version":4,"net_src_ip":"10.12.3.32","net_src_port":58659,"net_dst_ip":"10.14.2.56","net_dst_port":4343,"net_protocol":6,"timestamp":"2009-08-02 13:59:31","sig_type":1,"sig_id":17335,"sig_revision":2,"sig_category":"0","sig_priority":3,"classification":0,"sig_message":"indicator-shellcode x86 os agnostic fnstenv geteip byte xor decoder"},
{"id":"7a4ca69ee1d6070d620c236b29f287b8c4395c6cf7ad3db5ab35b5ac5741cc5a","node_id":"3c2260189e68bdf0deede9a61b6c475072b22e9af3fb589f985250e31bba137b","evt_corr_id":"39ae88fd73f60014603ce485e5f632ca75cc40961f6cabbc58e951a8e106f52a","ssn_corr_id":"b3bfa70fbaa5b59cd3e10f4728d62974b978235a9bb2f05332a1b669be54f584","net_version":4,"net_src_ip":"10.12.3.32","net_src_port":4343,"net_dst_ip":"10.14.2.56","net_dst_port":50211,"net_protocol":6,"timestamp":"2009-08-02 11:31:01","sig_type":1,"sig_id":17335,"sig_revision":2,"sig_category":"0","sig_priority":3,"classification":0,"sig_message":"indicator-shellcode x86 os agnostic fnstenv geteip byte xor decoder"},
{"id":"7a4d07dbae1fac935d050c7bbc4357c47a6fee2a43b54697ef0f9d2430f06b1e","node_id":"3c2260189e68bdf0deede9a61b6c475072b22e9af3fb589f985250e31bba137b","evt_corr_id":"dfbdd46ddc94ed2f78eb66e6596824f7586c1f31f3d8adb22998ce4c690b88ce","ssn_corr_id":"069785bd377f992a812b29a47eb1480da626956ecc03df0afc7ad0476ea04cf1","net_version":4,"net_src_ip":"10.12.3.32","net_src_port":56322,"net_dst_ip":"10.14.2.56","net_dst_port":1787,"net_protocol":6,"timestamp":"2009-08-02 14:28:23","sig_type":1,"sig_id":17335,"sig_revision":2,"sig_category":"0","sig_priority":1,"classification":0,"sig_message":"indicator-shellcode x86 os agnostic fnstenv geteip byte xor decoder"},
{"id":"7a4d73bee9b003810517d80b3280a6b2c6b60c2f4bff3c30bbd5f114776449b6","node_id":"3c2260189e68bdf0deede9a61b6c475072b22e9af3fb589f985250e31bba137b","evt_corr_id":"04997042e0f7cdbcb0b5e4354844f2998c91fcc15be04424c5a6cc31f5de41f2","ssn_corr_id":"5ce4a0178c9bb3a94b62805d44e962e5163cb7fddcc9f4e3ca01b4f5f30f8dfd","net_version":4,"net_src_ip":"10.12.3.32","net_src_port":4343,"net_dst_ip":"10.14.2.56","net_dst_port":58654,"net_protocol":6,"timestamp":"2009-08-03 04:02:04","sig_type":1,"sig_id":17335,"sig_revision":2,"sig_category":"0","sig_priority":1,"classification":0,"sig_message":"indicator-shellcode x86 os agnostic fnstenv geteip byte xor decoder"},
{"id":"7a4dbbbe6fae1a492dc257b9cf03526a71337d142222ada23086656f152ae1e2","node_id":"3c2260189e68bdf0deede9a61b6c475072b22e9af3fb589f985250e31bba137b","evt_corr_id":"a7c9a475fb8a27c0dfbe5d4bc291bfcfa237c2df321621b7c7e87264417b6f8c","ssn_corr_id":"50ce6b32fc636d8e908e21585ace4ba736abdbc16be08fb540fd16681ff834b1","net_version":4,"net_src_ip":"10.12.3.32","net_src_port":50405,"net_dst_ip":"10.14.2.56","net_dst_port":5500,"net_protocol":6,"timestamp":"2009-08-03 06:19:34","sig_type":1,"sig_id":17335,"sig_revision":2,"sig_category":"0","sig_priority":3,"classification":0,"sig_message":"indicator-shellcode x86 os agnostic fnstenv geteip byte xor decoder"},
{"id":"7a4e503d18e3e235c3b2d33ce41d0866dafa00be9b4010e49b87049aa7cf7eec","node_id":"3c2260189e68bdf0deede9a61b6c475072b22e9af3fb589f985250e31bba137b","evt_corr_id":"c57e13ae2e742333e43b6c43535478b204d339770c53763b2cc6684c9340014c","ssn_corr_id":"1188c5f096a08277933dd3a1db6b01affa48b38fe8991c798b8cca7d6a3c480d","net_version":4,"net_src_ip":"10.12.3.32","net_src_port":54504,"net_dst_ip":"10.14.2.56","net_dst_port":5500,"net_protocol":6,"timestamp":"2009-08-03 06:24:46","sig_type":1,"sig_id":17335,"sig_revision":2,"sig_category":"0","sig_priority":2,"classification":0,"sig_message":"indicator-shellcode x86 os agnostic fnstenv geteip byte xor decoder"},
{"id":"7a4e6e570e18274083109efadc6b0314423e297562c445e0cce40e76709160a9","node_id":"3c2260189e68bdf0deede9a61b6c475072b22e9af3fb589f985250e31bba137b","evt_corr_id":"b32d1acde5896f4a1cdd62e504c7fa1b53b0fa68a779758d95f54fa16badfffd","ssn_corr_id":"17e05edc2808ef4fcb11d2a0ac869c1e374999cd7996616f1f4e3e34d0b9c4f2","net_version":4,"net_src_ip":"10.12.3.32","net_src_port":4343,"net_dst_ip":"10.14.2.56","net_dst_port":61981,"net_protocol":6,"timestamp":"2009-08-02 11:46:25","sig_type":1,"sig_id":17335,"sig_revision":2,"sig_category":"0","sig_priority":2,"classification":0,"sig_message":"indicator-shellcode x86 os agnostic fnstenv geteip byte xor decoder"},
{"id":"7a4ef583ba8c5a70e012bb78c5e896a1d3f65bbdcf4175c93cf80b2217e8ac71","node_id":"3c2260189e68bdf0deede9a61b6c475072b22e9af3fb589f985250e31bba137b","evt_corr_id":"e7859b1cb95e8fdeb0665b53ef1e07a8eba0cdddfd5a6cfe9aaab7654f9f590d","ssn_corr_id":"56ba558d0f5d90d304f5574095d661edac0debffdedfa867d17f31d56f52ff7f","net_version":4,"net_src_ip":"10.12.3.32","net_src_port":50864,"net_dst_ip":"10.14.2.56","net_dst_port":4343,"net_protocol":6,"timestamp":"2009-08-02 14:41:56","sig_type":1,"sig_id":17335,"sig_revision":2,"sig_category":"0","sig_priority":2,"classification":0,"sig_message":"indicator-shellcode x86 os agnostic fnstenv geteip byte xor decoder"},
{"id":"7a4efdae0e4cb799bea75a8ea0b3c9a02e19139270072725b7c1e01b14e0ad3e","node_id":"3c2260189e68bdf0deede9a61b6c475072b22e9af3fb589f985250e31bba137b","evt_corr_id":"8cfc1ef86beec18a354beb0e29ab2b01bb177198b1710fddf0ed83e1fadc5f83","ssn_corr_id":"b9779f852e29637915e26fdc2e1e6974ba0c2ed34ab3a61a06d2eb53acae4c73","net_version":4,"net_src_ip":"10.12.3.32","net_src_port":62098,"net_dst_ip":"10.14.2.56","net_dst_port":4343,"net_protocol":6,"timestamp":"2009-08-03 06:31:39","sig_type":1,"sig_id":17335,"sig_revision":2,"sig_category":"0","sig_priority":1,"classification":0,"sig_message":"indicator-shellcode x86 os agnostic fnstenv geteip byte xor decoder"},
{"id":"7a4f34b0170bf5e4b1575376155daafd27d5e681ea8dddfbe617876272b0ce58","node_id":"3c2260189e68bdf0deede9a61b6c475072b22e9af3fb589f985250e31bba137b","evt_corr_id":"b40583c8a46d5e66249eda9ff63654eb0e860a7252adfdc4570cb0f2b1de3978","ssn_corr_id":"d029f7da94448b12ffd7632533cb827a54063a2df36a1f89084899e044b2b4bc","net_version":4,"net_src_ip":"10.12.3.32","net_src_port":4343,"net_dst_ip":"10.14.2.56","net_dst_port":58166,"net_protocol":6,"timestamp":"2009-08-02 14:10:56","sig_type":1,"sig_id":17335,"sig_revision":2,"sig_category":"0","sig_priority":1,"classification":0,"sig_message":"indicator-shellcode x86 os agnostic fnstenv geteip byte xor decoder"},
{"id":"7a4f706a5b25ee199abb91076b71e5210fdd17aa69ee59428660412700821425","node_id":"3c2260189e68bdf0deede9a61b6c475072b22e9af3fb589f985250e31bba137b","evt_corr_id":"d8c27e87dda6a671a87e5f643f24b94d3b8992c693428d145893d0090f7ae005","ssn_corr_id":"d45a0a6bb9b796aa2b540ebe2cb33e763d74c4c28687b278169437f11ff2eeb0","net_version":4,"net_src_ip":"10.12.3.32","net_src_port":58912,"net_dst_ip":"10.14.2.56","net_dst_port":4343,"net_protocol":6,"timestamp":"2009-08-02 10:56:59","sig_type":1,"sig_id":17335,"sig_revision":2,"sig_category":"0","sig_priority":1,"classification":0,"sig_message":"indicator-shellcode x86 os agnostic fnstenv geteip byte xor decoder"},
{"id":"7a5048be2311571b3b365be48a705b246f76553c1449ba4b5b383bb07da48bb0","node_id":"3c2260189e68bdf0deede9a61b6c475072b22e9af3fb589f985250e31bba137b","evt_corr_id":"09a460c6af128fa48e80bda473cc602802ee2aa71deb3ceb284afb0b23acb24d","ssn_corr_id":"70adcdd09f5a37b2f3653b44030b641656e696f033888d0d89a833376eb19181","net_version":4,"net_src_ip":"10.12.3.32","net_src_port":55480,"net_dst_ip":"10.14.2.56","net_dst_port":4343,"net_protocol":6,"timestamp":"2009-08-02 14:48:05","sig_type":1,"sig_id":17335,"sig_revision":2,"sig_category":"0","sig_priority":1,"classification":0,"sig_message":"indicator-shellcode x86 os agnostic fnstenv geteip byte xor decoder"},
{"id":"7a50b25f6d6fd1ed001b92cba514cc86b19b1d54f9f561d31cc782bff87730a1","node_id":"3c2260189e68bdf0deede9a61b6c475072b22e9af3fb589f985250e31bba137b","evt_corr_id":"1c0231d1fd3f8b23567a5b22f34cc73d053be46e7fcbf518a62a4428e6f0fa85","ssn_corr_id":"baa9ed0ed8ac150cb0fe94b64fc415343afc34efc64866de67b4dd72e6dfb0b4","net_version":4,"net_src_ip":"10.12.3.32","net_src_port":57006,"net_dst_ip":"10.14.2.56","net_dst_port":4343,"net_protocol":6,"timestamp":"2009-08-02 14:08:29","sig_type":1,"sig_id":17335,"sig_revision":2,"sig_category":"0","sig_priority":1,"classification":0,"sig_message":"indicator-shellcode x86 os agnostic fnstenv geteip byte xor decoder"},
{"id":"7a512bc1166b284a80bd76f6defadfba76eb6b67b2b329d8146c3137b5fbe67a","node_id":"3c2260189e68bdf0deede9a61b6c475072b22e9af3fb589f985250e31bba137b","evt_corr_id":"105406741f0cf4ce39446e73ec470a44371c0eaa1087ba96d600a1699a59aa72","ssn_corr_id":"765d7780eaa40aa55099aa78b472c9c5d13b5227e7b96a092d6070e99fde3752","net_version":4,"net_src_ip":"10.12.3.32","net_src_port":61526,"net_dst_ip":"10.14.2.56","net_dst_port":4343,"net_protocol":6,"timestamp":"2009-08-02 11:24:01","sig_type":1,"sig_id":17335,"sig_revision":2,"sig_category":"0","sig_priority":1,"classification":0,"sig_message":"indicator-shellcode x86 os agnostic fnstenv geteip byte xor decoder"},
{"id":"7a513be4d7fa27182849d97cfe0b5147589e43c355f280459979f2f6b3bc40e6","node_id":"3c2260189e68bdf0deede9a61b6c475072b22e9af3fb589f985250e31bba137b","evt_corr_id":"7a942b129238c8f98cdc60f01f2f96565db474df2be9ead9e384982d3b0bda2b","ssn_corr_id":"43ad90d9eabeb30797801973364dddd1bef93df36ae4535f7c97dfbcd60ea2f1","net_version":4,"net_src_ip":"10.12.3.32","net_src_port":840,"net_dst_ip":"10.14.2.56","net_dst_port":747,"net_protocol":17,"timestamp":"2009-08-02 08:55:59","sig_type":1,"sig_id":17335,"sig_revision":2,"sig_category":"0","sig_priority":1,"classification":0,"sig_message":"indicator-shellcode x86 os agnostic fnstenv geteip byte xor decoder"},
{"id":"7a516be99b3939adb396eacfb298ad3e69aeefe9d4c85bd5289dbc6f4c501b70","node_id":"3c2260189e68bdf0deede9a61b6c475072b22e9af3fb589f985250e31bba137b","evt_corr_id":"2deb04e262e6a0714b94a9814d74363538c041eec6737fbdd2e3b0cfc3b2932b","ssn_corr_id":"03ac53147e825807329db8df93df69dad392b26cd73372cbd348f6dbf07a918c","net_version":4,"net_src_ip":"10.12.3.32","net_src_port":4343,"net_dst_ip":"10.14.2.56","net_dst_port":56002,"net_protocol":6,"timestamp":"2009-08-03 03:58:31","sig_type":1,"sig_id":17335,"sig_revision":2,"sig_category":"0","sig_priority":1,"classification":0,"sig_message":"indicator-shellcode x86 os agnostic fnstenv geteip byte xor decoder"},
{"id":"7a52006f0d51a063deac063feff6475657cd11479872df9246994e9b60930388","node_id":"3c2260189e68bdf0deede9a61b6c475072b22e9af3fb589f985250e31bba137b","evt_corr_id":"69196ffef7f031513a0de734f385c692e5dacc46aadddab20f32f4b52078f156","ssn_corr_id":"03208289e430aa1658650d67cef6d080690d4d0399ef4a6574623fec509e5d9f","net_version":4,"net_src_ip":"10.12.3.32","net_src_port":57380,"net_dst_ip":"10.14.2.56","net_dst_port":4343,"net_protocol":6,"timestamp":"2009-08-02 10:54:36","sig_type":1,"sig_id":17335,"sig_revision":2,"sig_category":"0","sig_priority":1,"classification":0,"sig_message":"indicator-shellcode x86 os agnostic fnstenv geteip byte xor decoder"},
{"id":"7a527f2b64f971de9d978c4b54e400578aadd5a09745e3839e7180540fcd4e6f","node_id":"3c2260189e68bdf0deede9a61b6c475072b22e9af3fb589f985250e31bba137b","evt_corr_id":"e9b86c10c04a520add0050fb47a7aca5bde1ceeed2f98384ea4afb4fe60ccc7b","ssn_corr_id":"6ecd564f89c9dfeee86db47b5cc7cb2135f62a7aac3baee41423800b11328dcc","net_version":4,"net_src_ip":"10.12.3.32","net_src_port":4343,"net_dst_ip":"10.14.2.56","net_dst_port":62740,"net_protocol":6,"timestamp":"2009-08-02 11:47:24","sig_type":1,"sig_id":17335,"sig_revision":2,"sig_category":"0","sig_priority":2,"classification":0,"sig_message":"indicator-shellcode x86 os agnostic fnstenv geteip byte xor decoder"},
{"id":"7a531514e1b18edc0b1698e1653e4e9360afa0f86f52ab3d5d010d51e6fd5e77","node_id":"3c2260189e68bdf0deede9a61b6c475072b22e9af3fb589f985250e31bba137b","evt_corr_id":"3cd630998a07b7b93e57d983c818b50ed15070aa46b49e66a0eada8b49b03ae1","ssn_corr_id":"bc5b71a44e74d753373845502cf9d11a8b8597242b626d3b4c16d27c3eaa77d9","net_version":4,"net_src_ip":"10.12.3.32","net_src_port":58138,"net_dst_ip":"10.14.2.56","net_dst_port":4343,"net_protocol":6,"timestamp":"2009-08-02 11:41:25","sig_type":1,"sig_id":17335,"sig_revision":2,"sig_category":"0","sig_priority":1,"classification":0,"sig_message":"indicator-shellcode x86 os agnostic fnstenv geteip byte xor decoder"},
{"id":"7a5346dc8a58d77848f41419421edd9bb57ee2f493bd7ce7b3858d5b8beda001","node_id":"3c2260189e68bdf0deede9a61b6c475072b22e9af3fb589f985250e31bba137b","evt_corr_id":"ce3c2ceacba7d31899d99f30d01f9505f3d327295c2ce5ee43ebca96dfd633ea","ssn_corr_id":"5c29965bf211079ec198289c52987b0ef4aee1b0585e2589c0e3d218045cf923","net_version":4,"net_src_ip":"10.12.3.32","net_src_port":54859,"net_dst_ip":"10.14.2.56","net_dst_port":5500,"net_protocol":6,"timestamp":"2009-08-03 06:23:38","sig_type":1,"sig_id":17335,"sig_revision":2,"sig_category":"0","sig_priority":1,"classification":0,"sig_message":"indicator-shellcode x86 os agnostic fnstenv geteip byte xor decoder"},
{"id":"7a538c014ae7fcb81c38899bda896e6c565fe2159af01bd8cec0ef5ba289b288","node_id":"3c2260189e68bdf0deede9a61b6c475072b22e9af3fb589f985250e31bba137b","evt_corr_id":"41dc9ef5868b7d259936cf70a9379f66b49f5ed5d1f3a7dbf012ece46e12b7cc","ssn_corr_id":"189cf47162f6becd03322f3bc716157c40a9fe05a7f18cc2e2312fb782ca6134","net_version":4,"net_src_ip":"10.12.3.32","net_src_port":58898,"net_dst_ip":"10.14.2.56","net_dst_port":1787,"net_protocol":6,"timestamp":"2009-08-02 11:20:56","sig_type":1,"sig_id":17335,"sig_revision":2,"sig_category":"0","sig_priority":1,"classification":0,"sig_message":"indicator-shellcode x86 os agnostic fnstenv geteip byte xor decoder"},
{"id":"7a545204524e623638c6860e83e7d2f930d58741a7a8f9a98d5fa5f8b696fd64","node_id":"3c2260189e68bdf0deede9a61b6c475072b22e9af3fb589f985250e31bba137b","evt_corr_id":"1a255783db8d30b76a57b61472a2cc6e5128e914427a5d1bf513d72633505580","ssn_corr_id":"8f70afc57f4332727e628ed8413162e085457c4c18b10b57b353a329de1c564f","net_version":4,"net_src_ip":"10.12.3.32","net_src_port":60577,"net_dst_ip":"10.14.2.56","net_dst_port":4343,"net_protocol":6,"timestamp":"2009-08-02 10:59:21","sig_type":1,"sig_id":17335,"sig_revision":2,"sig_category":"0","sig_priority":3,"classification":0,"sig_message":"indicator-shellcode x86 os agnostic fnstenv geteip byte xor decoder"},
{"id":"7a54d34a76b3ee3c9d2d36ab0ad786511360a364ac15ab6330c0ddc5c246a053","node_id":"3c2260189e68bdf0deede9a61b6c475072b22e9af3fb589f985250e31bba137b","evt_corr_id":"763efdc6e8c4e34e14df841865d15f7fcfcff0058700bcce172999eb1540ecdf","ssn_corr_id":"30025d5dd9fb5e3597deb9a2f0a0fe79040185d79d05656ac1499375fc8bc38a","net_version":4,"net_src_ip":"10.12.3.32","net_src_port":4343,"net_dst_ip":"10.14.2.56","net_dst_port":62600,"net_protocol":6,"timestamp":"2009-08-02 13:05:51","sig_type":1,"sig_id":17335,"sig_revision":2,"sig_category":"0","sig_priority":4,"classification":0,"sig_message":"indicator-shellcode x86 os agnostic fnstenv geteip byte xor decoder"},
{"id":"7a550d686339b0df0b9d62ea52cc51b1632d63ce0ef1f361d4b48c38e232f800","node_id":"3c2260189e68bdf0deede9a61b6c475072b22e9af3fb589f985250e31bba137b","evt_corr_id":"e0614c97bf93bf99188d8d828cbaf3850857348d4f894efe8d9659dd28438040","ssn_corr_id":"51bee6f4e2f27885ec47a66cf4b6325cc068586e513708812b71a6b5e8091fcb","net_version":4,"net_src_ip":"10.12.3.32","net_src_port":4343,"net_dst_ip":"10.14.2.56","net_dst_port":59369,"net_protocol":6,"timestamp":"2009-08-03 04:42:25","sig_type":1,"sig_id":17335,"sig_revision":2,"sig_category":"0","sig_priority":5,"classification":0,"sig_message":"indicator-shellcode x86 os agnostic fnstenv geteip byte xor decoder"},
{"id":"7a5588ac37b241ca9670f91bfdd179b8387e97440e1aeca8e8b741aef15d45c7","node_id":"3c2260189e68bdf0deede9a61b6c475072b22e9af3fb589f985250e31bba137b","evt_corr_id":"8575338c1baeeaebfd6fb0641b0f83c6fe8226f45b0d6bc0c9ec18c3e5c3ff54","ssn_corr_id":"c2300726d5fb77ce27ef2df0ec1076f10a7e2cecb0f09152cec909e358a7c96b","net_version":4,"net_src_ip":"10.12.3.32","net_src_port":4343,"net_dst_ip":"10.14.2.56","net_dst_port":58337,"net_protocol":6,"timestamp":"2009-08-03 04:01:32","sig_type":1,"sig_id":17335,"sig_revision":2,"sig_category":"0","sig_priority":1,"classification":0,"sig_message":"indicator-shellcode x86 os agnostic fnstenv geteip byte xor decoder"},
{"id":"7a55f763a9fc6b2d62cb837a3d96db2d292860c38125dc805cfc63a451b90ea4","node_id":"3c2260189e68bdf0deede9a61b6c475072b22e9af3fb589f985250e31bba137b","evt_corr_id":"03b9d4fad6455d040ecf93eae50d828a71c2d9120e28006cd8cd708c0ca7500d","ssn_corr_id":"56325949e8e3c99f7865fd6fec105c9ff33c9b8cd9de2a756fb8e9577152d65a","net_version":4,"net_src_ip":"10.12.3.32","net_src_port":60420,"net_dst_ip":"10.14.2.56","net_dst_port":2337,"net_protocol":6,"timestamp":"2009-08-03 06:26:43","sig_type":1,"sig_id":17335,"sig_revision":2,"sig_category":"0","sig_priority":1,"classification":0,"sig_message":"indicator-shellcode x86 os agnostic fnstenv geteip byte xor decoder"},
{"id":"7a5644b2ce758c6f6aa3601e54957872d52204041a4f44a9782d1e0d583d0ad6","node_id":"3c2260189e68bdf0deede9a61b6c475072b22e9af3fb589f985250e31bba137b","evt_corr_id":"620282e998ce9db3812476b08a823987b28cb0e4e323e56c3a7be051f6735483","ssn_corr_id":"1b63ac5637aa81b6301e5348f7e8cc7cb5cc9574367f53228d318bda23c064d0","net_version":4,"net_src_ip":"10.12.3.32","net_src_port":60083,"net_dst_ip":"10.14.2.56","net_dst_port":1787,"net_protocol":6,"timestamp":"2009-08-02 14:33:11","sig_type":1,"sig_id":17335,"sig_revision":2,"sig_category":"0","sig_priority":1,"classification":0,"sig_message":"indicator-shellcode x86 os agnostic fnstenv geteip byte xor decoder"},
{"id":"7a56671f47e5f209578348e1025ebe23d28a5f82a1ae4ea513ef0677a47c11b5","node_id":"3c2260189e68bdf0deede9a61b6c475072b22e9af3fb589f985250e31bba137b","evt_corr_id":"96402afdc1582e042285d7c42dacd924508d5f66ae30a6afc3a5696c122c4aee","ssn_corr_id":"3406ff6f855cecf8bd4bf1ca77c78e1d1bff96ad9c795119cac552cf78cdff03","net_version":4,"net_src_ip":"10.12.3.32","net_src_port":4343,"net_dst_ip":"10.14.2.56","net_dst_port":64717,"net_protocol":6,"timestamp":"2009-08-02 11:49:43","sig_type":1,"sig_id":17335,"sig_revision":2,"sig_category":"0","sig_priority":1,"classification":0,"sig_message":"indicator-shellcode x86 os agnostic fnstenv geteip byte xor decoder"},
{"id":"7a57709a8f9a4c8de068b16b09b3c8ccecb74fa3bc159ebdaae2411094fcf662","node_id":"3c2260189e68bdf0deede9a61b6c475072b22e9af3fb589f985250e31bba137b","evt_corr_id":"6621d3c639d1cc619d24c6bea46764f468ead6059706f3217d01edb50f7f0e14","ssn_corr_id":"bb27fd7d935eb317fe5e1fe1e09e2ca586050604ca794d3325a9a2342413c1b1","net_version":4,"net_src_ip":"10.12.3.32","net_src_port":4343,"net_dst_ip":"10.14.2.56","net_dst_port":59678,"net_protocol":6,"timestamp":"2009-08-02 11:43:22","sig_type":1,"sig_id":17335,"sig_revision":2,"sig_category":"0","sig_priority":1,"classification":0,"sig_message":"indicator-shellcode x86 os agnostic fnstenv geteip byte xor decoder"},
{"id":"7a57d4214c2e8771c6a20139c6ad0a94073b03e272f9729cf26cae1c94d69717","node_id":"3c2260189e68bdf0deede9a61b6c475072b22e9af3fb589f985250e31bba137b","evt_corr_id":"525e0b4a93d25b115270243c7d82e8a1f2a55e363b75fe71d2e75b4080e417d5","ssn_corr_id":"b40c7431ba558944060a5f13ccc844f5fdc7e0ac5c3d5a71afe834fedf79aa56","net_version":4,"net_src_ip":"10.12.3.32","net_src_port":50021,"net_dst_ip":"10.14.2.56","net_dst_port":4343,"net_protocol":6,"timestamp":"2009-08-03 05:12:47","sig_type":1,"sig_id":17335,"sig_revision":2,"sig_category":"0","sig_priority":1,"classification":0,"sig_message":"indicator-shellcode x86 os agnostic fnstenv geteip byte xor decoder"},
{"id":"7a57e8514c185087eaada2dc72c682e825aa450111b929686073eaaf4c1a5d35","node_id":"3c2260189e68bdf0deede9a61b6c475072b22e9af3fb589f985250e31bba137b","evt_corr_id":"047a78cefc0e29fc1cfa60c3d697225a9678c168ed132f7c57ebae24d9a46e2d","ssn_corr_id":"ad49a859f837d7dae4607bac7b436d0d67469a9f411e5e4f5f6c953930992d37","net_version":4,"net_src_ip":"10.12.3.32","net_src_port":58560,"net_dst_ip":"10.14.2.56","net_dst_port":4343,"net_protocol":6,"timestamp":"2009-08-02 10:36:11","sig_type":1,"sig_id":17335,"sig_revision":2,"sig_category":"0","sig_priority":1,"classification":0,"sig_message":"indicator-shellcode x86 os agnostic fnstenv geteip byte xor decoder"},
{"id":"7a585302863ea7df3abac41d04d324670d8439a679c77aef011f57f1bee8e28b","node_id":"3c2260189e68bdf0deede9a61b6c475072b22e9af3fb589f985250e31bba137b","evt_corr_id":"39693c0b23bdc5ff83e3db0eeadb46c161fe6f3844406245b868795fdfaa1c89","ssn_corr_id":"0b4851b1b8513665e1027781273bbf544d474c948cd5b82ba9ae033207c4ba8e","net_version":4,"net_src_ip":"10.12.3.32","net_src_port":55972,"net_dst_ip":"10.14.2.56","net_dst_port":4343,"net_protocol":6,"timestamp":"2009-08-03 04:59:06","sig_type":1,"sig_id":17335,"sig_revision":2,"sig_category":"0","sig_priority":1,"classification":0,"sig_message":"indicator-shellcode x86 os agnostic fnstenv geteip byte xor decoder"},
{"id":"7a58dd9adb9f58495fc1e5c548ef12ff398228339824126b875f0b3ccd4314ec","node_id":"3c2260189e68bdf0deede9a61b6c475072b22e9af3fb589f985250e31bba137b","evt_corr_id":"8b08354666847ad7de8d5e9dd1881f13f4f71db08893fb5478c3c78bccb3160d","ssn_corr_id":"a07f16052be860ee579aad9872bdee6c59815192eea9f2b857f0749d6787fcd8","net_version":4,"net_src_ip":"10.12.3.32","net_src_port":61213,"net_dst_ip":"10.14.2.56","net_dst_port":1787,"net_protocol":6,"timestamp":"2009-08-02 11:00:13","sig_type":1,"sig_id":17335,"sig_revision":2,"sig_category":"0","sig_priority":1,"classification":0,"sig_message":"indicator-shellcode x86 os agnostic fnstenv geteip byte xor decoder"},
{"id":"7a590168c7576e80909ee61ea6e07b77d3a3678bd81628d2690932b04b5e2a8f","node_id":"3c2260189e68bdf0deede9a61b6c475072b22e9af3fb589f985250e31bba137b","evt_corr_id":"9f86b1e98c4d94206a82ecc5c0ca06ddb76773bf3c9a00384573b5b21890acaf","ssn_corr_id":"0a0bea992f511b469a170eaeb419144254e519f6df256eecc3d6512288170dc8","net_version":4,"net_src_ip":"10.12.3.32","net_src_port":4343,"net_dst_ip":"10.14.2.56","net_dst_port":52844,"net_protocol":6,"timestamp":"2009-08-03 03:14:50","sig_type":1,"sig_id":17335,"sig_revision":2,"sig_category":"0","sig_priority":1,"classification":0,"sig_message":"indicator-shellcode x86 os agnostic fnstenv geteip byte xor decoder"},
{"id":"7a59124bdfe8ac7588c98cfd5a351fe4b555202ccfe3352b729f59226cbd77d8","node_id":"3c2260189e68bdf0deede9a61b6c475072b22e9af3fb589f985250e31bba137b","evt_corr_id":"7da3c038a6487273b75b047bb2ebcfb96b9ffdac4da0cbdeccabbd9079ccc2c1","ssn_corr_id":"fc02b554354b213fc4988a897e4164d62decfa4e6cf2c04272f1371d1a9e1f90","net_version":4,"net_src_ip":"10.12.3.32","net_src_port":4343,"net_dst_ip":"10.14.2.56","net_dst_port":62844,"net_protocol":6,"timestamp":"2009-08-02 13:06:31","sig_type":1,"sig_id":17335,"sig_revision":2,"sig_category":"0","sig_priority":1,"classification":0,"sig_message":"indicator-shellcode x86 os agnostic fnstenv geteip byte xor decoder"},
{"id":"7a597e9da56146f07187024cadc2f48147b8cbf944fcd11d4be5a60f9735c9b0","node_id":"3c2260189e68bdf0deede9a61b6c475072b22e9af3fb589f985250e31bba137b","evt_corr_id":"c0909bb8e79ab3b3e21f2c34147a383687ee8c2e87202e061e132e5ad46967cb","ssn_corr_id":"b69ed8f74283827a4c237ca270989da4a80bde2a7752cc9f92be10b15c3ada76","net_version":4,"net_src_ip":"10.12.3.32","net_src_port":60740,"net_dst_ip":"10.14.2.56","net_dst_port":4343,"net_protocol":6,"timestamp":"2009-08-02 11:23:12","sig_type":1,"sig_id":17335,"sig_revision":2,"sig_category":"0","sig_priority":1,"classification":0,"sig_message":"indicator-shellcode x86 os agnostic fnstenv geteip byte xor decoder"},
{"id":"7a59810d532224bffcc0147e184603347e7e1c535cdac27827b5da9a53740dd9","node_id":"3c2260189e68bdf0deede9a61b6c475072b22e9af3fb589f985250e31bba137b","evt_corr_id":"0eadfa4cf2ab8220d5542e22b997e981d94f67802bcd85d250f91937e0a2b182","ssn_corr_id":"4732d2deb0329c52950a1d0f841d7ad90d457f0f9bed7eb53f7b9a710a1bd593","net_version":4,"net_src_ip":"10.12.3.32","net_src_port":61708,"net_dst_ip":"10.14.2.56","net_dst_port":1787,"net_protocol":6,"timestamp":"2009-08-02 11:24:20","sig_type":1,"sig_id":17335,"sig_revision":2,"sig_category":"0","sig_priority":1,"classification":0,"sig_message":"indicator-shellcode x86 os agnostic fnstenv geteip byte xor decoder"},
{"id":"7a59ada4edc1ceed71fb0e77b53de823058c6736709ed5cb5ae4b419a95f9722","node_id":"3c2260189e68bdf0deede9a61b6c475072b22e9af3fb589f985250e31bba137b","evt_corr_id":"158e89a6f015b4f82736137c464f17ae8b739803eab7c5cf9a8ca1985bdaf808","ssn_corr_id":"1048b9444f00605f0b1f97928091d86b7839f4759b996b88cc35dcc013e5bbf6","net_version":4,"net_src_ip":"10.12.3.32","net_src_port":64616,"net_dst_ip":"10.14.2.56","net_dst_port":4343,"net_protocol":6,"timestamp":"2009-08-03 06:34:18","sig_type":1,"sig_id":17335,"sig_revision":2,"sig_category":"0","sig_priority":1,"classification":0,"sig_message":"indicator-shellcode x86 os agnostic fnstenv geteip byte xor decoder"},
{"id":"7a5a25a89b004735beca02fcc7fa1e4bc8b77120b27251bf81a76e93f55081c2","node_id":"3c2260189e68bdf0deede9a61b6c475072b22e9af3fb589f985250e31bba137b","evt_corr_id":"75d1aa205e6f1ebfbf605b439a754b2a696bf651a5c6cb1483dea17ef55f3324","ssn_corr_id":"27e57d9482cc728bce5fc13311fd46386ac1e7c8f05a0e588ec1086fc82a3330","net_version":4,"net_src_ip":"10.12.3.32","net_src_port":56266,"net_dst_ip":"10.14.2.56","net_dst_port":1787,"net_protocol":6,"timestamp":"2009-08-02 11:59:34","sig_type":1,"sig_id":17335,"sig_revision":2,"sig_category":"0","sig_priority":1,"classification":0,"sig_message":"indicator-shellcode x86 os agnostic fnstenv geteip byte xor decoder"},
{"id":"7a5a673e84145b0c4e388a3850bd266a211a693f2e514fc488079aed37d9cc39","node_id":"3c2260189e68bdf0deede9a61b6c475072b22e9af3fb589f985250e31bba137b","evt_corr_id":"d534dae297bdfd46af7dfdaceb6a14f0c21a93e723361c3a70b7fd8efceafd0a","ssn_corr_id":"e21f06c672257e6d0bd052e4f41b7ab210fbd03795c3a16eb2cba85c6f618ad0","net_version":4,"net_src_ip":"10.12.3.32","net_src_port":54987,"net_dst_ip":"10.14.2.56","net_dst_port":5500,"net_protocol":6,"timestamp":"2009-08-03 03:57:16","sig_type":1,"sig_id":17335,"sig_revision":2,"sig_category":"0","sig_priority":1,"classification":0,"sig_message":"indicator-shellcode x86 os agnostic fnstenv geteip byte xor decoder"},
{"id":"7a5ae835ffdaa6c8f4677a06402f94113ecf9b911a4e6bd1319a170610f45833","node_id":"3c2260189e68bdf0deede9a61b6c475072b22e9af3fb589f985250e31bba137b","evt_corr_id":"b1a210411e9942ecc8de69a34cecdce5eaa8d21fe7a0af7ccdfa934ffb54f32b","ssn_corr_id":"2bb3c893997a95a5203c5a2f707860b4734aee74fdef113dd750cd567db9b45c","net_version":4,"net_src_ip":"10.12.3.32","net_src_port":65143,"net_dst_ip":"10.14.2.56","net_dst_port":5500,"net_protocol":6,"timestamp":"2009-08-03 03:29:26","sig_type":1,"sig_id":17335,"sig_revision":2,"sig_category":"0","sig_priority":1,"classification":0,"sig_message":"indicator-shellcode x86 os agnostic fnstenv geteip byte xor decoder"}];

  $scope.eventCount = function() {
    return $scope.items.length;
  };

  $scope.formatEventSourceIP = function(e) {
    return e.net_src_ip + ':' + e.net_src_port;
  };

  $scope.formatEventDestinationIP = function(e) {
    return e.net_dst_ip + ':' + e.net_dst_port;
  };

  $scope.formatEventTimestamp = function(e) {
    return e.timestamp;
  };

  $scope.priorityClass = function(priority) {
    return ( priority > 3 ) ? 'badge-priority-default' : 'badge-priority-' + priority;
  };

  $scope.toggleEventDetails = function(e) {
    if( '_showDetails' in e )
      e._showDetails ^= true;
    else
      e._showDetails = true;

    console.log('showing details');
  };

  $scope.showEventDetails = function(e) {
    return ( '_showDetails' in e ) &&
           ( e._showDetails );
  };

  //
  // PAGINATION
  $scope.sortField = 'sig_priority';
  $scope.sortReverse = false;
  $scope.filteredItems = [];
  $scope.groupedItems = [];
  $scope.pagedItems = [];
  $scope.currentPage = 0;

  $scope.pageSizes = [
    { name: '5', value: 5 },
    { name: '10', value: 10 },
    { name: '25', value: 25 },
    { name: '50', value: 50 },
    { name: 'All', value: $scope.items.length }
  ];

  $scope.pageSize = $scope.pageSizes[0];

  var searchMatch = function (haystack, needle) {
    if( !needle ) {
      return true;
    }

    return haystack.toString().toLowerCase().indexOf(needle.toLowerCase()) !== -1;
  };

  // init the filtered items
  $scope.search = function () {
    $scope.filteredItems = $filter('filter')($scope.items, function (item) {
      for(var attr in item) {
        if (searchMatch(item[attr], $scope.query))
          return true;
      }
      return false;
    });
    // take care of the sorting order
    if ($scope.sortField !== '') {
      $scope.filteredItems = $filter('orderBy')($scope.filteredItems, $scope.sortField, $scope.reverse);
    }

    $scope.currentPage = 0;

    // now group by pages
    $scope._groupToPages();
  };
     
  // calculate page in place
  $scope._groupToPages = function() {
    $scope.pagedItems = [];
         
    for( var i = 0; i < $scope.filteredItems.length; i++ ) {
      if( i % $scope.pageSize.value === 0 ) {
        $scope.pagedItems[Math.floor(i / $scope.pageSize.value)] = [ $scope.filteredItems[i] ];
      }
      else {
        $scope.pagedItems[Math.floor(i / $scope.pageSize.value)].push($scope.filteredItems[i]);
      }
    }
  };
     
  $scope.range = function(start, end) {
    var ret = [];
    if( !end ) {
      end = start;
      start = 0;
    }
    for (var i = start; i < end; i++) {
      ret.push(i);
    }

    return ret;
  };
     
  $scope.isFirstPage = function() {
    return $scope.currentPage === 0;
  }

  $scope.isLastPage = function() {
    return $scope.currentPage === ($scope.pagedItems.length - 1);
  }

  $scope.firstPage = function () {
    if ($scope.currentPage > 0) {
      $scope.currentPage = 0;
    }
  };

  $scope.prevPage = function () {
    if ($scope.currentPage > 0) {
      $scope.currentPage--;
    }
  };
     
  $scope.nextPage = function () {
    if ($scope.currentPage < $scope.pagedItems.length - 1) {
      $scope.currentPage++;
    }
  };

  $scope.lastPage = function () {
    if ($scope.currentPage < $scope.pagedItems.length - 1) {
      $scope.currentPage = ($scope.pagedItems.length - 1);
    }
  };
     
  $scope.setPage = function(n) {
    $scope.currentPage = n;
  };

  $scope.getPageList = function(max) {
    var _m = max || 5;
    var _list = [];

    if( _m >= $scope.pagedItems.length ) {
      for( var i = 0; i < $scope.pagedItems.length; i++ ) {
        _list.push(i);
      }
    }
    else {
      /* calculate lower and upper bounds */
      var _lb = Math.max(0, $scope.currentPage - Math.floor(_m / 2));
      var _ub = Math.min($scope.pagedItems.length, _lb + _m);

      if( (_ub-_lb) <= (_m-1) ) {
        _lb = _ub - _m;
      }

      for( var i = _lb; i < _ub; i++ ) {
        _list.push(i);
      }
    }

    return _list;
  }

  // change sorting order
  $scope.sortBy = function(newSortField) {
    if( $scope.sortField === newSortField )
      $scope.sortReverse ^= true;

    $scope.sortField = newSortField;
  };

  $scope.getSortClass = function(f) {
    if( $scope.sortField !== f )
      return '';

    return $scope.sortReverse ? 'sort-down' : 'sort-up';
  }

  //
  // INIT

  $scope.search();
  echidnaService.setPage('events');
};


