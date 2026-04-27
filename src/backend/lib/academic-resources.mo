import Types "../types/academic-resources";
import List "mo:core/List";
import Time "mo:core/Time";

module {
  public type AcademicResource = Types.AcademicResource;
  public type AcademicCategory = Types.AcademicCategory;

  /// Generate a simple unique ID from a counter and timestamp.
  public func makeId(counter : Nat) : Text {
    "ar-" # debug_show(counter) # "-" # debug_show(Time.now());
  };

  /// Create a new AcademicResource record.
  public func newResource(
    id : Text,
    title : Text,
    category : AcademicCategory,
    description : Text,
    storageKey : Text,
  ) : AcademicResource {
    {
      id;
      title;
      category;
      description;
      uploadedAt = Time.now();
      storageKey;
    };
  };

  /// Return all resources, optionally filtered by category.
  public func listResources(
    resources : List.List<AcademicResource>,
    category : ?AcademicCategory,
  ) : [AcademicResource] {
    switch (category) {
      case null { resources.toArray() };
      case (?cat) {
        resources.filter(func(r) { r.category == cat }).toArray();
      };
    };
  };

  /// Add a resource to the list.
  public func addResource(
    resources : List.List<AcademicResource>,
    resource : AcademicResource,
  ) {
    resources.add(resource);
  };

  /// Remove a resource by id. Returns true if found and removed.
  public func removeResource(
    resources : List.List<AcademicResource>,
    id : Text,
  ) : Bool {
    let sizeBefore = resources.size();
    let remaining = resources.filter(func(r) { r.id != id });
    resources.clear();
    resources.append(remaining);
    resources.size() < sizeBefore;
  };
};
