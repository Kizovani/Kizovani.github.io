import {
  mergeVertices
} from "./chunk-YR2EOFR3.js";
import {
  BufferGeometry,
  Color,
  Float32BufferAttribute,
  Vector2,
  Vector3,
  Vector4
} from "./chunk-RZ4XFWCU.js";
import "./chunk-BUSYA2B4.js";

// node_modules/three/examples/jsm/modifiers/SimplifyModifier.js
var _cb = new Vector3();
var _ab = new Vector3();
var SimplifyModifier = class {
  modify(geometry, count) {
    geometry = geometry.clone();
    delete geometry.morphAttributes.position;
    delete geometry.morphAttributes.normal;
    const attributes = geometry.attributes;
    for (const name in attributes) {
      if (name !== "position" && name !== "uv" && name !== "normal" && name !== "tangent" && name !== "color") geometry.deleteAttribute(name);
    }
    geometry = mergeVertices(geometry);
    const vertices = [];
    const faces = [];
    const positionAttribute = geometry.getAttribute("position");
    const uvAttribute = geometry.getAttribute("uv");
    const normalAttribute = geometry.getAttribute("normal");
    const tangentAttribute = geometry.getAttribute("tangent");
    const colorAttribute = geometry.getAttribute("color");
    let t = null;
    let v2 = null;
    let nor = null;
    let col = null;
    for (let i = 0; i < positionAttribute.count; i++) {
      const v = new Vector3().fromBufferAttribute(positionAttribute, i);
      if (uvAttribute) {
        v2 = new Vector2().fromBufferAttribute(uvAttribute, i);
      }
      if (normalAttribute) {
        nor = new Vector3().fromBufferAttribute(normalAttribute, i);
      }
      if (tangentAttribute) {
        t = new Vector4().fromBufferAttribute(tangentAttribute, i);
      }
      if (colorAttribute) {
        col = new Color().fromBufferAttribute(colorAttribute, i);
      }
      const vertex = new Vertex(v, v2, nor, t, col);
      vertices.push(vertex);
    }
    let index = geometry.getIndex();
    if (index !== null) {
      for (let i = 0; i < index.count; i += 3) {
        const a = index.getX(i);
        const b = index.getX(i + 1);
        const c = index.getX(i + 2);
        const triangle = new Triangle(vertices[a], vertices[b], vertices[c], a, b, c);
        faces.push(triangle);
      }
    } else {
      for (let i = 0; i < positionAttribute.count; i += 3) {
        const a = i;
        const b = i + 1;
        const c = i + 2;
        const triangle = new Triangle(vertices[a], vertices[b], vertices[c], a, b, c);
        faces.push(triangle);
      }
    }
    for (let i = 0, il = vertices.length; i < il; i++) {
      computeEdgeCostAtVertex(vertices[i]);
    }
    let nextVertex;
    let z = count;
    while (z--) {
      nextVertex = minimumCostEdge(vertices);
      if (!nextVertex) {
        console.log("THREE.SimplifyModifier: No next vertex");
        break;
      }
      collapse(vertices, faces, nextVertex, nextVertex.collapseNeighbor);
    }
    const simplifiedGeometry = new BufferGeometry();
    const position = [];
    const uv = [];
    const normal = [];
    const tangent = [];
    const color = [];
    index = [];
    for (let i = 0; i < vertices.length; i++) {
      const vertex = vertices[i];
      position.push(vertex.position.x, vertex.position.y, vertex.position.z);
      if (vertex.uv) {
        uv.push(vertex.uv.x, vertex.uv.y);
      }
      if (vertex.normal) {
        normal.push(vertex.normal.x, vertex.normal.y, vertex.normal.z);
      }
      if (vertex.tangent) {
        tangent.push(vertex.tangent.x, vertex.tangent.y, vertex.tangent.z, vertex.tangent.w);
      }
      if (vertex.color) {
        color.push(vertex.color.r, vertex.color.g, vertex.color.b);
      }
      vertex.id = i;
    }
    for (let i = 0; i < faces.length; i++) {
      const face = faces[i];
      index.push(face.v1.id, face.v2.id, face.v3.id);
    }
    simplifiedGeometry.setAttribute("position", new Float32BufferAttribute(position, 3));
    if (uv.length > 0) simplifiedGeometry.setAttribute("uv", new Float32BufferAttribute(uv, 2));
    if (normal.length > 0) simplifiedGeometry.setAttribute("normal", new Float32BufferAttribute(normal, 3));
    if (tangent.length > 0) simplifiedGeometry.setAttribute("tangent", new Float32BufferAttribute(tangent, 4));
    if (color.length > 0) simplifiedGeometry.setAttribute("color", new Float32BufferAttribute(color, 3));
    simplifiedGeometry.setIndex(index);
    return simplifiedGeometry;
  }
};
function pushIfUnique(array, object) {
  if (array.indexOf(object) === -1) array.push(object);
}
function removeFromArray(array, object) {
  const k = array.indexOf(object);
  if (k > -1) array.splice(k, 1);
}
function computeEdgeCollapseCost(u, v) {
  const edgelength = v.position.distanceTo(u.position);
  let curvature = 0;
  const sideFaces = [];
  for (let i = 0, il = u.faces.length; i < il; i++) {
    const face = u.faces[i];
    if (face.hasVertex(v)) {
      sideFaces.push(face);
    }
  }
  for (let i = 0, il = u.faces.length; i < il; i++) {
    let minCurvature = 1;
    const face = u.faces[i];
    for (let j = 0; j < sideFaces.length; j++) {
      const sideFace = sideFaces[j];
      const dotProd = face.normal.dot(sideFace.normal);
      minCurvature = Math.min(minCurvature, (1.001 - dotProd) / 2);
    }
    curvature = Math.max(curvature, minCurvature);
  }
  const borders = 0;
  if (sideFaces.length < 2) {
    curvature = 1;
  }
  const amt = edgelength * curvature + borders;
  return amt;
}
function computeEdgeCostAtVertex(v) {
  if (v.neighbors.length === 0) {
    v.collapseNeighbor = null;
    v.collapseCost = -0.01;
    return;
  }
  v.collapseCost = 1e5;
  v.collapseNeighbor = null;
  for (let i = 0; i < v.neighbors.length; i++) {
    const collapseCost = computeEdgeCollapseCost(v, v.neighbors[i]);
    if (!v.collapseNeighbor) {
      v.collapseNeighbor = v.neighbors[i];
      v.collapseCost = collapseCost;
      v.minCost = collapseCost;
      v.totalCost = 0;
      v.costCount = 0;
    }
    v.costCount++;
    v.totalCost += collapseCost;
    if (collapseCost < v.minCost) {
      v.collapseNeighbor = v.neighbors[i];
      v.minCost = collapseCost;
    }
  }
  v.collapseCost = v.totalCost / v.costCount;
}
function removeVertex(v, vertices) {
  console.assert(v.faces.length === 0);
  while (v.neighbors.length) {
    const n = v.neighbors.pop();
    removeFromArray(n.neighbors, v);
  }
  removeFromArray(vertices, v);
}
function removeFace(f, faces) {
  removeFromArray(faces, f);
  if (f.v1) removeFromArray(f.v1.faces, f);
  if (f.v2) removeFromArray(f.v2.faces, f);
  if (f.v3) removeFromArray(f.v3.faces, f);
  const vs = [f.v1, f.v2, f.v3];
  for (let i = 0; i < 3; i++) {
    const v1 = vs[i];
    const v2 = vs[(i + 1) % 3];
    if (!v1 || !v2) continue;
    v1.removeIfNonNeighbor(v2);
    v2.removeIfNonNeighbor(v1);
  }
}
function collapse(vertices, faces, u, v) {
  if (!v) {
    removeVertex(u, vertices);
    return;
  }
  if (v.uv) {
    u.uv.copy(v.uv);
  }
  if (v.normal) {
    v.normal.add(u.normal).normalize();
  }
  if (v.tangent) {
    v.tangent.add(u.tangent).normalize();
  }
  const tmpVertices = [];
  for (let i = 0; i < u.neighbors.length; i++) {
    tmpVertices.push(u.neighbors[i]);
  }
  for (let i = u.faces.length - 1; i >= 0; i--) {
    if (u.faces[i] && u.faces[i].hasVertex(v)) {
      removeFace(u.faces[i], faces);
    }
  }
  for (let i = u.faces.length - 1; i >= 0; i--) {
    u.faces[i].replaceVertex(u, v);
  }
  removeVertex(u, vertices);
  for (let i = 0; i < tmpVertices.length; i++) {
    computeEdgeCostAtVertex(tmpVertices[i]);
  }
}
function minimumCostEdge(vertices) {
  let least = vertices[0];
  for (let i = 0; i < vertices.length; i++) {
    if (vertices[i].collapseCost < least.collapseCost) {
      least = vertices[i];
    }
  }
  return least;
}
var Triangle = class {
  constructor(v1, v2, v3, a, b, c) {
    this.a = a;
    this.b = b;
    this.c = c;
    this.v1 = v1;
    this.v2 = v2;
    this.v3 = v3;
    this.normal = new Vector3();
    this.computeNormal();
    v1.faces.push(this);
    v1.addUniqueNeighbor(v2);
    v1.addUniqueNeighbor(v3);
    v2.faces.push(this);
    v2.addUniqueNeighbor(v1);
    v2.addUniqueNeighbor(v3);
    v3.faces.push(this);
    v3.addUniqueNeighbor(v1);
    v3.addUniqueNeighbor(v2);
  }
  computeNormal() {
    const vA = this.v1.position;
    const vB = this.v2.position;
    const vC = this.v3.position;
    _cb.subVectors(vC, vB);
    _ab.subVectors(vA, vB);
    _cb.cross(_ab).normalize();
    this.normal.copy(_cb);
  }
  hasVertex(v) {
    return v === this.v1 || v === this.v2 || v === this.v3;
  }
  replaceVertex(oldv, newv) {
    if (oldv === this.v1) this.v1 = newv;
    else if (oldv === this.v2) this.v2 = newv;
    else if (oldv === this.v3) this.v3 = newv;
    removeFromArray(oldv.faces, this);
    newv.faces.push(this);
    oldv.removeIfNonNeighbor(this.v1);
    this.v1.removeIfNonNeighbor(oldv);
    oldv.removeIfNonNeighbor(this.v2);
    this.v2.removeIfNonNeighbor(oldv);
    oldv.removeIfNonNeighbor(this.v3);
    this.v3.removeIfNonNeighbor(oldv);
    this.v1.addUniqueNeighbor(this.v2);
    this.v1.addUniqueNeighbor(this.v3);
    this.v2.addUniqueNeighbor(this.v1);
    this.v2.addUniqueNeighbor(this.v3);
    this.v3.addUniqueNeighbor(this.v1);
    this.v3.addUniqueNeighbor(this.v2);
    this.computeNormal();
  }
};
var Vertex = class {
  constructor(v, uv, normal, tangent, color) {
    this.position = v;
    this.uv = uv;
    this.normal = normal;
    this.tangent = tangent;
    this.color = color;
    this.id = -1;
    this.faces = [];
    this.neighbors = [];
    this.collapseCost = 0;
    this.collapseNeighbor = null;
  }
  addUniqueNeighbor(vertex) {
    pushIfUnique(this.neighbors, vertex);
  }
  removeIfNonNeighbor(n) {
    const neighbors = this.neighbors;
    const faces = this.faces;
    const offset = neighbors.indexOf(n);
    if (offset === -1) return;
    for (let i = 0; i < faces.length; i++) {
      if (faces[i].hasVertex(n)) return;
    }
    neighbors.splice(offset, 1);
  }
};
export {
  SimplifyModifier
};
//# sourceMappingURL=three_examples_jsm_modifiers_SimplifyModifier__js.js.map
