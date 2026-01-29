import 'package:flutter/material.dart';
import 'core/routing/router.dart';
class CareConnectApp extends StatelessWidget {
  const CareConnectApp({super.key});
  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      debugShowCheckedModeBanner: false,
      title: 'CareConnect',
      routerConfig: appRouter,
      theme: ThemeData(useMaterial3: true),
    );
  }
}
