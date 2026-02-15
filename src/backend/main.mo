import Map "mo:core/Map";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Iter "mo:core/Iter";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // Initialize access control state and include authorization mixin
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User Profile type
  public type UserProfile = {
    name : Text;
    email : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  // User Profile management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Article management
  public type Article = {
    id : Nat;
    title : Text;
    content : Text;
    author : Text;
    published : Bool;
  };

  // Admission Request type
  public type AdmissionRequest = {
    id : Nat;
    name : Text;
    email : Text;
    program : Text;
    motivation : Text;
  };

  let articles = Map.empty<Nat, Article>();
  let admissionRequests = Map.empty<Nat, AdmissionRequest>();
  var nextArticleId = 0;
  var nextAdmissionId = 0;

  // Article CRUD operations - accessible to everyone (guests included)
  public query ({ caller }) func getAllPublishedArticles() : async [Article] {
    articles.values().toArray().filter(func(a) { a.published });
  };

  public query ({ caller }) func getArticleById(id : Nat) : async Article {
    switch (articles.get(id)) {
      case (null) { Runtime.trap("Article does not exist") };
      case (?article) {
        if (not article.published) {
          Runtime.trap("Article not published by admin");
        };
        article;
      };
    };
  };

  // Admin-only article management
  public shared ({ caller }) func createArticle(title : Text, content : Text, author : Text) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };

    let article : Article = {
      id = nextArticleId;
      title;
      content;
      author;
      published = false;
    };
    articles.add(nextArticleId, article);
    nextArticleId += 1;
    article.id;
  };

  public shared ({ caller }) func updateArticle(id : Nat, title : Text, content : Text, author : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };

    switch (articles.get(id)) {
      case (null) { Runtime.trap("Article does not exist") };
      case (?existing) {
        let updated : Article = {
          id;
          title;
          content;
          author;
          published = existing.published;
        };
        articles.add(id, updated);
      };
    };
  };

  public shared ({ caller }) func setArticlePublished(id : Nat, published : Bool) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };

    switch (articles.get(id)) {
      case (null) { Runtime.trap("Article does not exist") };
      case (?existing) {
        let updated : Article = {
          id;
          title = existing.title;
          content = existing.content;
          author = existing.author;
          published;
        };
        articles.add(id, updated);
      };
    };
  };

  public shared ({ caller }) func deleteArticle(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };

    if (not articles.containsKey(id)) {
      Runtime.trap("Article does not exist. No action needed");
    };
    articles.remove(id);
  };

  // Admissions operations - submission accessible to everyone
  public shared ({ caller }) func submitAdmissionRequest(name : Text, email : Text, program : Text, motivation : Text) : async Nat {
    if (name.size() == 0) { Runtime.trap("Name is required") };
    if (email.size() == 0) { Runtime.trap("Email is required") };
    if (program.size() == 0) { Runtime.trap("Program is required") };
    if (motivation.size() == 0) { Runtime.trap("Motivation statement is required") };

    let request : AdmissionRequest = {
      id = nextAdmissionId;
      name;
      email;
      program;
      motivation;
    };
    admissionRequests.add(nextAdmissionId, request);
    nextAdmissionId += 1;
    request.id;
  };

  // Admin-only admission request management
  public query ({ caller }) func getAllAdmissionRequests() : async [AdmissionRequest] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    admissionRequests.values().toArray();
  };

  public shared ({ caller }) func deleteAdmissionRequest(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };

    if (not admissionRequests.containsKey(id)) {
      Runtime.trap("Admission request does not exist. No action needed");
    };
    admissionRequests.remove(id);
  };
};
