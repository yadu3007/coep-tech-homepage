import Types "types/academic-resources";
import AcademicResourcesApi "mixins/academic-resources-api";
import List "mo:core/List";

actor {
  let resources = List.empty<Types.AcademicResource>();

  include AcademicResourcesApi(resources);
};
