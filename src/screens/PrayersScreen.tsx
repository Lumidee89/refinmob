import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Modal,
  StatusBar,
  Platform,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import WebView, { WebView as WebViewType } from "react-native-webview";

// Different URLs for host and listener
const MIXLR_URLS = {
  host: "https://mixlr.com/therefinerschurch/dashboard", // Host dashboard
  listener: "https://mixlr.com/therefinerschurch", // Public page
  broadcast: "https://mixlr.com/therefinerschurch/broadcast", // Broadcast page
};

export default function PrayersScreen() {
  const [isLive, setIsLive] = useState(false);
  const [showWebView, setShowWebView] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<'host' | 'listener' | null>(null);
  const [currentUrl, setCurrentUrl] = useState("");
  const webViewRef = useRef<WebViewType>(null);

  // Check if stream is live (simulated - in real app, use Mixlr API)
  const checkLiveStatus = async () => {
    try {
      // In a real app, you would call Mixlr API here
      // For now, we'll simulate with a timeout
      setTimeout(() => {
        // Randomly set live status for demo
        setIsLive(Math.random() > 0.5);
      }, 1000);
    } catch (error) {
      console.error("Error checking live status:", error);
    }
  };

  useEffect(() => {
    checkLiveStatus();
    const interval = setInterval(checkLiveStatus, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const handleHostPress = () => {
    setUserRole('host');
    setCurrentUrl(MIXLR_URLS.host);
    setShowWebView(true);
    
    Alert.alert(
      "Host Mode",
      "You're opening Mixlr dashboard. To start prayer:\n\n1. Log in with your Mixlr account\n2. Click 'Go Live' button\n3. Start your prayer broadcast\n\nListeners will automatically see your stream.",
      [{ text: "Got it" }]
    );
  };

  const handleListenerPress = () => {
    setUserRole('listener');
    setCurrentUrl(MIXLR_URLS.listener);
    setShowWebView(true);
    
    if (!isLive) {
      Alert.alert(
        "No Live Prayer",
        "There's no active prayer session right now. The host might be setting up or prayer hasn't started yet.\n\nCheck back soon or view the schedule.",
        [{ text: "Continue" }]
      );
    }
  };

  const handleWebViewClose = () => {
    setShowWebView(false);
    setUserRole(null);
  };

  const handleRefresh = () => {
    if (webViewRef.current) {
      webViewRef.current.reload();
    }
  };

  const handleSwitchToApp = () => {
    Alert.alert(
      "Open Mixlr App",
      "For better experience, open in Mixlr app?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Open App",
          onPress: () => {
            Linking.openURL("mixlr://");
            handleWebViewClose();
          },
        },
      ]
    );
  };

  const handleShareLink = () => {
    const shareUrl = MIXLR_URLS.listener;
    Alert.alert(
      "Share Prayer Link",
      "Share this link with others to join the prayer:",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Copy Link",
          onPress: () => {
            // In real app, use Clipboard API
            Alert.alert("Copied!", "Link copied to clipboard.");
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Main Content */}
      <View style={styles.container}>
        {/* Header Section */}
        <View style={styles.header}>
          <Ionicons name="heart" size={40} color="#E07A5F" />
          <Text style={styles.title}>Prayer Altar</Text>
          <Text style={styles.subtitle}>
            "The prayer of a righteous person is powerful and effective."
          </Text>
          <Text style={styles.verse}>— James 5:16</Text>
        </View>

        {/* Live Status with Actual Info */}
        <View style={[styles.statusCard, isLive && styles.liveStatusCard]}>
          <View style={styles.statusContent}>
            <View style={styles.statusIndicator}>
              <View style={[styles.statusDot, isLive && styles.liveDot]} />
              <Text style={styles.statusText}>
                {isLive ? "LIVE PRAYER NOW" : "PRAYER OFFLINE"}
              </Text>
            </View>
            <Text style={styles.statusMessage}>
              {isLive 
                ? "Join the ongoing prayer session" 
                : "Check schedule for next prayer"}
            </Text>
            
            {isLive && (
              <TouchableOpacity 
                style={styles.joinNowButton}
                onPress={handleListenerPress}
              >
                <Ionicons name="play-circle" size={20} color="#FFF" />
                <Text style={styles.joinNowText}>Join Now</Text>
              </TouchableOpacity>
            )}
          </View>
          
          <View style={styles.statusStats}>
            <View style={styles.statItem}>
              <Ionicons name="mic" size={16} color="#666" />
              <Text style={styles.statText}>1 Host</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="people" size={16} color="#666" />
              <Text style={styles.statText}>24 Listening</Text>
            </View>
          </View>
        </View>

        {/* Role Selection */}
        <View style={styles.roleSection}>
          <Text style={styles.sectionTitle}>Join Prayer Session</Text>
          <Text style={styles.sectionSubtitle}>
            Select your role to participate
          </Text>

          <View style={styles.roleCards}>
            {/* Host Card */}
            <TouchableOpacity
              style={[styles.roleCard, styles.hostCard]}
              onPress={handleHostPress}
            >
              <View style={styles.roleIconContainer}>
                <View style={[styles.roleIcon, styles.hostIcon]}>
                  <Ionicons name="mic" size={32} color="#FFF" />
                </View>
              </View>
              <Text style={styles.roleTitle}>Start Prayer</Text>
              <Text style={styles.roleDescription}>
                Host and lead prayer sessions
              </Text>
              
              <View style={styles.requirements}>
                <View style={styles.requirementItem}>
                  <Ionicons name="checkmark-circle" size={14} color="#4CAF50" />
                  <Text style={styles.requirementText}>Mixlr account required</Text>
                </View>
                <View style={styles.requirementItem}>
                  <Ionicons name="checkmark-circle" size={14} color="#4CAF50" />
                  <Text style={styles.requirementText}>Microphone access</Text>
                </View>
              </View>
              
              <View style={styles.roleAction}>
                <Ionicons name="radio" size={20} color="#E07A5F" />
                <Text style={styles.roleActionText}>Go Live</Text>
              </View>
            </TouchableOpacity>

            {/* Listener Card */}
            <TouchableOpacity
              style={[styles.roleCard, styles.listenerCard]}
              onPress={handleListenerPress}
            >
              <View style={styles.roleIconContainer}>
                <View style={[styles.roleIcon, styles.listenerIcon]}>
                  <Ionicons name="headset" size={32} color="#FFF" />
                </View>
              </View>
              <Text style={styles.roleTitle}>Join Prayer</Text>
              <Text style={styles.roleDescription}>
                Listen and pray along
              </Text>
              
              <View style={styles.requirements}>
                <View style={styles.requirementItem}>
                  <Ionicons name="checkmark-circle" size={14} color="#2196F3" />
                  <Text style={styles.requirementText}>No account needed</Text>
                </View>
                <View style={styles.requirementItem}>
                  <Ionicons name="checkmark-circle" size={14} color="#2196F3" />
                  <Text style={styles.requirementText}>Works instantly</Text>
                </View>
              </View>
              
              <View style={styles.roleAction}>
                <Ionicons 
                  name={isLive ? "volume-high" : "time"} 
                  size={20} 
                  color={isLive ? "#4CAF50" : "#666"} 
                />
                <Text style={[
                  styles.roleActionText,
                  isLive && styles.liveActionText
                ]}>
                  {isLive ? "Listen Live" : "Check Status"}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Troubleshooting Section */}
        <View style={styles.troubleshootSection}>
          <Text style={styles.sectionTitle}>Having Issues?</Text>
          
          <View style={styles.troubleshootCards}>
            <TouchableOpacity 
              style={styles.troubleshootCard}
              onPress={handleShareLink}
            >
              <Ionicons name="share-social" size={24} color="#E07A5F" />
              <Text style={styles.troubleshootTitle}>Share Link</Text>
              <Text style={styles.troubleshootText}>
                Send prayer link to others
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.troubleshootCard}
              onPress={handleSwitchToApp}
            >
              <Ionicons name="phone-portrait" size={24} color="#2196F3" />
              <Text style={styles.troubleshootTitle}>Use Mixlr App</Text>
              <Text style={styles.troubleshootText}>
                Better experience in app
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Important Instructions */}
        <View style={styles.instructionsCard}>
          <Ionicons name="warning" size={24} color="#FF9800" />
          <View style={styles.instructionsContent}>
            <Text style={styles.instructionsTitle}>Important</Text>
            <Text style={styles.instruction}>
              • Hosts must use Mixlr dashboard to broadcast
            </Text>
            <Text style={styles.instruction}>
              • Listeners go to public Mixlr page
            </Text>
            <Text style={styles.instruction}>
              • Prayer appears when host clicks "Go Live"
            </Text>
            <Text style={styles.instruction}>
              • Refresh page if you don't see prayer
            </Text>
          </View>
        </View>
      </View>

      {/* In-App WebView Modal */}
      <Modal
        visible={showWebView}
        animationType="slide"
        onRequestClose={handleWebViewClose}
        statusBarTranslucent={true}
      >
        <View style={styles.modalContainer}>
          {/* Fixed Top Header */}
          <View style={styles.topHeader}>
            <View style={styles.headerContent}>
              <TouchableOpacity 
                style={styles.backButton}
                onPress={handleWebViewClose}
              >
                <Ionicons name="arrow-back" size={24} color="#FFF" />
              </TouchableOpacity>
              
              <View style={styles.headerTitleContainer}>
                <Text style={styles.headerTitle}>
                  {userRole === 'host' ? 'Host Dashboard' : 'Live Prayer'}
                </Text>
                <Text style={styles.headerSubtitle}>
                  {userRole === 'host' ? 'Start broadcasting' : 'Join prayer session'}
                </Text>
              </View>
              
              <View style={styles.headerActions}>
                <TouchableOpacity 
                  style={styles.headerAction}
                  onPress={handleRefresh}
                >
                  <Ionicons name="refresh" size={22} color="#FFF" />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.headerAction}
                  onPress={handleSwitchToApp}
                >
                  <Ionicons name="phone-portrait" size={22} color="#FFF" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Role Indicator */}
          <View style={[
            styles.roleIndicator,
            userRole === 'host' ? styles.hostIndicator : styles.listenerIndicator
          ]}>
            <View style={styles.roleIndicatorContent}>
              <Ionicons 
                name={userRole === 'host' ? "mic" : "headset"} 
                size={16} 
                color="#FFF" 
              />
              <Text style={styles.roleIndicatorText}>
                {userRole === 'host' ? 'HOST MODE' : 'LISTENER MODE'}
              </Text>
              {userRole === 'listener' && !isLive && (
                <Text style={styles.waitingText}> (Waiting for host)</Text>
              )}
            </View>
          </View>

          {/* WebView Container */}
          <View style={styles.webViewContainer}>
            {loading && (
              <View style={styles.loadingOverlay}>
                <ActivityIndicator size="large" color="#E07A5F" />
                <Text style={styles.loadingText}>
                  {userRole === 'host' 
                    ? "Loading Mixlr dashboard..." 
                    : "Connecting to prayer..."}
                </Text>
                {userRole === 'listener' && !isLive && (
                  <Text style={styles.loadingHint}>
                    The host may not be live yet
                  </Text>
                )}
              </View>
            )}
            
            <WebView
              ref={webViewRef}
              source={{ uri: currentUrl }}
              style={styles.webView}
              onLoadStart={() => setLoading(true)}
              onLoadEnd={() => setLoading(false)}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              startInLoadingState={true}
              allowsFullscreenVideo={true}
              allowsInlineMediaPlayback={true}
              mediaPlaybackRequiresUserAction={false}
              scalesPageToFit={true}
              mixedContentMode="always"
              cacheEnabled={true}
              onError={(syntheticEvent) => {
                const { nativeEvent } = syntheticEvent;
                console.warn('WebView error: ', nativeEvent);
                Alert.alert(
                  "Connection Error",
                  `Unable to load ${userRole === 'host' ? 'dashboard' : 'prayer page'}.`,
                  [
                    { text: "Retry", onPress: handleRefresh },
                    { text: "Close", onPress: handleWebViewClose },
                    {
                      text: "Open in Browser",
                      onPress: () => {
                        Linking.openURL(currentUrl);
                        handleWebViewClose();
                      },
                    },
                  ]
                );
              }}
              onNavigationStateChange={(navState) => {
                // Optional: Track navigation
                console.log("Navigated to:", navState.url);
              }}
            />
          </View>

          {/* Action Bar */}
          <View style={styles.actionBar}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={handleRefresh}
            >
              <Ionicons name="refresh" size={20} color="#666" />
              <Text style={styles.actionButtonText}>Refresh</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => {
                if (userRole === 'host') {
                  Alert.alert(
                    "Host Help",
                    "To start prayer:\n1. Log in (top right)\n2. Click 'Go Live'\n3. Allow microphone\n4. Start praying"
                  );
                } else {
                  Alert.alert(
                    "Listener Help",
                    "If you don't see prayer:\n1. Wait for host to go live\n2. Refresh page\n3. Check your volume\n4. Try Mixlr app"
                  );
                }
              }}
            >
              <Ionicons name="help-circle" size={20} color="#666" />
              <Text style={styles.actionButtonText}>Help</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={handleShareLink}
            >
              <Ionicons name="share" size={20} color="#666" />
              <Text style={styles.actionButtonText}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F7EFEA",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 25,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#333",
    marginTop: 10,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    lineHeight: 20,
    fontStyle: "italic",
    marginBottom: 4,
  },
  verse: {
    fontSize: 13,
    color: "#E07A5F",
    fontWeight: "600",
  },
  statusCard: {
    backgroundColor: "#FFF",
    borderRadius: 15,
    padding: 20,
    marginBottom: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  liveStatusCard: {
    backgroundColor: "#E8F5E9",
    borderWidth: 2,
    borderColor: "#C8E6C9",
  },
  statusContent: {
    marginBottom: 15,
  },
  statusIndicator: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#F44336",
    marginRight: 10,
  },
  liveDot: {
    backgroundColor: "#4CAF50",
    shadowColor: "#4CAF50",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
  statusText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
  },
  statusMessage: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  joinNowButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E07A5F",
    alignSelf: "flex-start",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    marginTop: 5,
  },
  joinNowText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 14,
    marginLeft: 8,
  },
  statusStats: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
    paddingTop: 15,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  statText: {
    fontSize: 13,
    color: "#666",
    marginLeft: 6,
  },
  roleSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
  },
  roleCards: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  roleCard: {
    width: "48%",
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  hostCard: {
    borderWidth: 2,
    borderColor: "#E07A5F",
  },
  listenerCard: {
    borderWidth: 2,
    borderColor: "#2196F3",
  },
  roleIconContainer: {
    alignItems: "center",
    marginBottom: 15,
  },
  roleIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  hostIcon: {
    backgroundColor: "#E07A5F",
  },
  listenerIcon: {
    backgroundColor: "#2196F3",
  },
  roleTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    textAlign: "center",
    marginBottom: 8,
  },
  roleDescription: {
    fontSize: 13,
    color: "#666",
    textAlign: "center",
    marginBottom: 15,
    lineHeight: 18,
  },
  requirements: {
    marginBottom: 20,
  },
  requirementItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  requirementText: {
    fontSize: 12,
    color: "#666",
    marginLeft: 6,
  },
  roleAction: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F9F9F9",
    paddingVertical: 10,
    borderRadius: 10,
  },
  roleActionText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginLeft: 8,
  },
  liveActionText: {
    color: "#4CAF50",
  },
  troubleshootSection: {
    marginBottom: 30,
  },
  troubleshootCards: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  troubleshootCard: {
    width: "48%",
    backgroundColor: "#FFF",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  troubleshootTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
    marginTop: 10,
    marginBottom: 5,
  },
  troubleshootText: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    lineHeight: 16,
  },
  instructionsCard: {
    flexDirection: "row",
    backgroundColor: "#FFF3E0",
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
    borderLeftWidth: 4,
    borderLeftColor: "#FF9800",
  },
  instructionsContent: {
    flex: 1,
    marginLeft: 15,
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
    marginBottom: 10,
  },
  instruction: {
    fontSize: 13,
    color: "#444",
    marginBottom: 6,
    lineHeight: 18,
  },
  
  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: "#000",
  },
  topHeader: {
    backgroundColor: "#E07A5F",
    paddingTop: Platform.OS === 'ios' ? 50 : (StatusBar.currentHeight ?? 0) + 10,
    paddingBottom: 15,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  backButton: {
    padding: 8,
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFF",
    textAlign: "center",
  },
  headerSubtitle: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
    marginTop: 2,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerAction: {
    padding: 8,
    marginLeft: 10,
  },
  roleIndicator: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    paddingVertical: 10,
  },
  roleIndicatorContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  hostIndicator: {
    backgroundColor: "rgba(224, 122, 95, 0.9)",
  },
  listenerIndicator: {
    backgroundColor: "rgba(33, 150, 243, 0.9)",
  },
  roleIndicatorText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFF",
    marginLeft: 8,
  },
  waitingText: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.7)",
    fontStyle: "italic",
    marginLeft: 5,
  },
  webViewContainer: {
    flex: 1,
    backgroundColor: "#000",
  },
  webView: {
    flex: 1,
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    zIndex: 1000,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#FFF",
    fontWeight: "600",
  },
  loadingHint: {
    marginTop: 10,
    fontSize: 14,
    color: "#CCC",
    fontStyle: "italic",
  },
  actionBar: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  actionButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
  },
  actionButtonText: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
});
