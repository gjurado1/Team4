import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';
import 'package:webview_flutter_android/webview_flutter_android.dart';

void main() {
  runApp(const CareConnectApp());
}

class CareConnectApp extends StatelessWidget {
  const CareConnectApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      debugShowCheckedModeBanner: false,
      home: CareConnectWebView(),
    );
  }
}

class CareConnectWebView extends StatefulWidget {
  const CareConnectWebView({super.key});

  @override
  State<CareConnectWebView> createState() => _CareConnectWebViewState();
}

class _CareConnectWebViewState extends State<CareConnectWebView> {
  late final WebViewController controller;

  @override
  void initState() {
    super.initState();

    // Ensure Android implementation is registered
    WebViewPlatform.instance = AndroidWebViewPlatform();

    controller = WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      // Android emulator → your PC (React dev server)
      ..loadRequest(Uri.parse('http://10.0.2.2:3000/'));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: WebViewWidget(controller: controller),
      ),
    );
  }
}
