import Types "../types/academic-resources";
import AcademicResourcesLib "../lib/academic-resources";
import List "mo:core/List";

mixin (
  resources : List.List<Types.AcademicResource>,
) {
  /// List all academic resources, optionally filtered by category.
  public query func getAcademicResources(
    category : ?Types.AcademicCategory
  ) : async [Types.AcademicResource] {
    AcademicResourcesLib.listResources(resources, category);
  };

  /// Admin: add a new academic resource entry (metadata only; file is stored via object-storage).
  public func addAcademicResource(
    title : Text,
    category : Types.AcademicCategory,
    description : Text,
    storageKey : Text,
  ) : async Types.AcademicResource {
    let id = AcademicResourcesLib.makeId(resources.size() + 1);
    let resource = AcademicResourcesLib.newResource(id, title, category, description, storageKey);
    AcademicResourcesLib.addResource(resources, resource);
    resource;
  };

  /// Admin: delete an academic resource entry by id.
  public func deleteAcademicResource(id : Text) : async Bool {
    AcademicResourcesLib.removeResource(resources, id);
  };
};
