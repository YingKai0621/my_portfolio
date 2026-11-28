# P7A — Studio MACACO Technical Discovery

> **2026-11-27 addendum:** This document records the earlier research gate. The owner subsequently rejected FORM IN MOTION, supplied the Project Glacier storyboard, and reported an automated response welcoming non-profit use of the public mecha GLB. That report permits a **provisional local-development experiment only**; it is not an independently verified license for modifications, redistribution or a public career portfolio. The historical “do not use” recommendation below is superseded only for this local test. See `docs/P7_ASSET_PROVENANCE.md` and the latest P7 entry in `docs/DECISIONS.md`. Public deployment remains blocked pending written rights confirmation.

Ngày khảo sát: 2026-11-27. Phạm vi: trang chủ tiếng Anh và tài nguyên frontend được phục vụ công khai; không truy cập mã nguồn riêng, không đưa model/shader của Studio MACACO vào repository. **[Xác minh]** là điều quan sát trực tiếp trong trang, HTML, bundle công khai hoặc metadata GLB. **[Giả thuyết]** là suy luận kỹ thuật chưa thể xác nhận. **[Đề xuất]** dành riêng cho Project Glacier, không mô tả cách Studio MACACO chắc chắn đã làm.

## 1. Công nghệ đã xác minh

- **[Xác minh]** Trang là React SPA: HTML có `#root`, bundle React riêng và các chunk route/scene tải động. HTML công khai nhắc trực tiếp Vite trong quá trình phát triển; cấu trúc asset hash phù hợp một Vite build. Đây không phải bằng chứng rằng mọi phần của studio dùng cùng stack. [HTML trang chủ](https://studiomacaco.ch/en/), [bundle entry](https://studiomacaco.ch/assets/index-C9i0ixVU.js).
- **[Xác minh]** Bundle 3D chứa Three.js, React Three Fiber và React Three Postprocessing; scene sử dụng canvas 3D, glTF loader, animation actions, lights và các pass Bloom/Vignette. Bundle `motion` riêng phục vụ chuyển động UI. Không tìm thấy dấu hiệu GSAP hay Lenis trong các chunk intro đã kiểm tra; **không** suy ra chúng vắng mặt trên toàn website. [bundle 3D](https://studiomacaco.ch/assets/three-FHAWq-Sj.js), [RobotScene](https://studiomacaco.ch/assets/RobotScene-Duz-VMUf.js), [Motion chunk](https://studiomacaco.ch/assets/motion-CidDmcIf.js).
- **[Xác minh]** Model dùng ở intro là [GLB công khai `/intro/Mecha_Full.glb`](https://studiomacaco.ch/intro/Mecha_Full.glb), 2.667.520 byte. Metadata glTF 2.0 ghi `glTF-Transform v4.4.2`; 11 mesh primitives dạng triangles, khoảng 192.367 triangles; 1 skin với 71 joints, 8 materials, 12 ảnh WebP nhúng. Extensions: `EXT_meshopt_compression`, `EXT_texture_webp`, `KHR_mesh_quantization`; hai extension đầu/cuối tương ứng meshopt và quantization là bắt buộc trong file. **Không có KTX2/Basis hoặc Draco trong metadata của model này**; việc loader vendor chứa mã hỗ trợ chúng không chứng minh model sử dụng chúng. [GLB metadata](https://studiomacaco.ch/intro/Mecha_Full.glb), [Three.js GLTFLoader](https://threejs.org/docs/pages/GLTFLoader.html).
- **[Xác minh]** Bốn clip trong GLB: `power_on` (~2,67 s), `build` (~7,33 s), `descent` (~4,40 s), `idle` (~1,83 s). Durations lấy từ mốc thời gian lớn nhất của animation samplers; đây là độ dài clip, không phải thời lượng hiển thị trên trang. [GLB metadata](https://studiomacaco.ch/intro/Mecha_Full.glb).
- **[Xác minh]** Không có `sourceMappingURL` trong các chunk được lấy mẫu; các URL `.js.map` tương ứng của entry, Home, RobotScene, RobotStage, ditherMaterial và bundle Three đều trả HTTP 404 tại thời điểm khảo sát. Chưa kiểm tra mọi asset của website. [RobotScene](https://studiomacaco.ch/assets/RobotScene-Duz-VMUf.js), [ditherMaterial](https://studiomacaco.ch/assets/ditherMaterial-BzIEYm5H.js).

## 2. Cơ chế tương tác và hình ảnh quan sát được

- **[Quan sát trực tiếp]** Trên desktop, nhân vật xuất hiện cận cảnh lúc mở trang. Khi cuộn, bố cục chuyển qua lớp HUD/trạng thái kỹ thuật và các cỡ máy quay khác nhau; ở một đoạn nhân vật có vật liệu sáng, iridescent/holographic; cuối intro model thu nhỏ vào bố cục toàn thân với nền kiến trúc và nội dung chính. Các ảnh quan sát tại mốc cuộn 0, 2, 6 và 12 viewport được tạo bằng Chrome sạch trong thư mục tạm, không thêm vào repo. [Trang gốc](https://studiomacaco.ch/en/).
- **[Xác minh từ bundle]** Hệ camera có tám mốc desktop và bộ vị trí/FOV riêng cho khung hẹp. Mỗi mốc mô tả vị trí, điểm nhìn, FOV, thời điểm, chuyển cảnh kiểu cut/lerp, clip gắn với cảnh và trạng thái đèn. Intro dùng `scroll-root`, scroll spacer, listener cuộn và `requestAnimationFrame` để ánh xạ vị trí cuộn sang thời gian scene; có cơ chế xử lý touch/smoothing riêng. Đây là điều tra trên bundle công khai, **không phải** một demo GSAP ScrollTrigger. [entry](https://studiomacaco.ch/assets/index-C9i0ixVU.js), [Home](https://studiomacaco.ch/assets/Home-Dm1OyUrx.js), [RobotScene](https://studiomacaco.ch/assets/RobotScene-Duz-VMUf.js).
- **[Xác minh từ bundle]** Robot được animate bằng các clip trên rig. Material kim loại/PBR có phần emissive tùy biến qua uniforms và `onBeforeCompile`; một material riêng dùng ordered screen-space dithering để chuyển trạng thái hiển thị. Scene còn có các bản sao/ghost ngắn hạn và các lớp shader năng lượng/iridescence. Không có bằng chứng để gọi đây là cùng một shader duy nhất hoặc xác định chính xác mọi pass từ ảnh chụp. [RobotScene](https://studiomacaco.ch/assets/RobotScene-Duz-VMUf.js), [RobotStage](https://studiomacaco.ch/assets/RobotStage-BbRRQNwI.js), [ditherMaterial](https://studiomacaco.ch/assets/ditherMaterial-BzIEYm5H.js).
- **[Xác minh từ bundle]** Scene dùng ambient, point và directional lights thay đổi theo camera shot; môi trường phản xạ được dựng bằng light-formers vào environment map nội bộ (resolution 256), không thấy HDR ngoài được nạp trong RobotScene. Post-processing gồm Bloom và Vignette; antialiasing renderer tắt và composer đặt multisampling bằng 0. Đây là thiết kế của reference, **không** là cấu hình bắt buộc cho P7. [RobotScene](https://studiomacaco.ch/assets/RobotScene-Duz-VMUf.js).
- **[Xác minh từ bundle]** Có lazy/suspense boundary, canvas chỉ render liên tục khi active, DPR giới hạn, theo dõi hiệu năng để điều chỉnh chất lượng, và kiểm tra reduced-motion/coarse pointer ở một số tương tác. Chưa benchmark FPS/bộ nhớ trên thiết bị thật. [entry](https://studiomacaco.ch/assets/index-C9i0ixVU.js), [Home](https://studiomacaco.ch/assets/Home-Dm1OyUrx.js), [RobotScene](https://studiomacaco.ch/assets/RobotScene-Duz-VMUf.js).

## 3. Nguồn gốc nhân vật và giấy phép

- **[Xác minh]** Model GLB công khai không khai báo `asset.copyright`, tác giả, hoặc metadata gốc đủ để truy nguyên người tạo; chỉ có tên file/generator và tên vật liệu, rig/clip. Chúng **không** chứng minh model do Studio MACACO tự tạo hay do bên thứ ba cung cấp. [GLB metadata](https://studiomacaco.ch/intro/Mecha_Full.glb).
- **[Chưa xác minh]** Khảo sát trang chính, trang dự án, `llms.txt` và tìm kiếm theo tên file/rig/material/clip không tìm được trang tải chính thức, credit riêng hoặc điều khoản cấp phép cho chính mecha này. Không thể kết luận rằng không hề có bản bán/licensed ở nơi khác. Dự án [“Become this way”](https://studiomacaco.ch/en/projects/become-this-way/) nói về nhân vật Cori-D1 khác; không dùng nó làm bằng chứng nguồn gốc mecha trang chủ.
- **[Quyết định an toàn]** Không đưa GLB, texture, animation hay shader của reference vào portfolio. Khả năng tải URL công khai không phải giấy phép tái sử dụng. Nếu muốn chính model đó, cần xác nhận trực tiếp quyền sử dụng với Studio MACACO/chủ sở hữu hoặc tìm listing chính thức có quyền dùng trên website; nếu không, dùng asset do chủ sở hữu cung cấp/đặt làm hoặc model bên thứ ba có giấy phép phù hợp.

## 4. Kiến trúc đề xuất cho Project Glacier

**[Đề xuất]** Dùng Next.js/React hiện tại để server-render nội dung và một client island cho scene. Dùng `three@0.187.0` hiện có trực tiếp, `gsap@3.15.1` + ScrollTrigger cho một timeline cuộn thuận/ngược, `motion@14.14.0` cho phản hồi DOM; chưa thêm React Three Fiber, postprocessing package hay smooth-scroll controller. P6 hiện dùng native scrolling + ScrollTrigger; **Lenis chưa được cài**. Mọi module tách khỏi model cụ thể:

```text
src/components/sections/project-glacier/
  project-glacier.tsx           # Nội dung, poster/fallback, locale, canvas boundary
  glacier-canvas.client.tsx     # Renderer, lifecycle, visibility, resize
  character/asset-manifest.ts   # URL, license, scale, anchor, clip/material semantic map
  character/load-character.ts   # GLTFLoader, decoder theo metadata, rig/clip adapter
  camera/shot-plan.ts           # Shot desktop/mobile, FOV, look target; không nhúng bone names
  lighting/scene-lighting.ts    # Key/fill/rim/environment preset Glacial Precision
  materials/material-system.ts  # PBR nền và hiệu ứng dither/hologram độc lập
  motion/scroll-director.ts     # Một timeline GSAP, đồng bộ camera/clip/shader
  interaction/scene-input.ts    # Pointer/touch/keyboard có giới hạn, không scroll hijack
  postfx/effect-pipeline.ts     # Bloom/tonemapping có thể tắt theo quality tier
  quality/quality-policy.ts     # DPR, visibility, reduced motion, WebGL fallback
```

`CharacterManifest` là hợp đồng thay asset: `url`, bằng chứng license/credit, scale và pivot chuẩn hóa, semantic clip map (`arrival`, `assemble`, `turn`, `idle`), material-slot map, poster tĩnh và budget. Loader trả về scene + mixer + bounds; không để camera, đèn, shader hoặc scroll director phụ thuộc tên node/clip cụ thể. Khi đổi model, chỉ sửa manifest/adapter và hiệu chỉnh shot framing, không viết lại toàn bộ trải nghiệm.

Một nguồn tiến trình cuộn duy nhất điều khiển camera, clip time và shader uniforms; không tạo các RAF/scroll controller trùng nhau. Pin/scroll distance chỉ áp dụng trong phạm vi P7, có pin spacing và điểm kết thúc rõ; P6 vẫn hoạt động độc lập. Motion chỉ điều khiển UI, không cạnh tranh quyền cập nhật transform/camera với Three/GSAP. Scene vẫn có CTA/nội dung HTML đọc được khi WebGL tắt, asset lỗi hoặc người dùng chọn reduced motion. Đây là **đề xuất**, không sao chép source hay timing của reference. [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/), [Three.js GLTFLoader](https://threejs.org/docs/pages/GLTFLoader.html).

## 5. Asset cần có trước khi triển khai

1. Model mecha chất lượng cao **có nguồn gốc và quyền web rõ ràng**, ưu tiên file gốc chỉnh sửa được cùng GLB 2.0 xuất bản; quyền cho phép nhúng/phân phối asset tới trình duyệt và chỉnh sửa material/animation phải được kiểm tra. Không dùng robot ghép từ primitive làm giải pháp thay thế.
2. Rig, skeleton và ít nhất các clip có ý nghĩa cho arrival/activation/idle/transition; bone naming, pivot, đơn vị đo, animation looping, material slots và bounds được bàn giao bằng manifest. Nếu model không có clip phù hợp, cần ngân sách rig/animation riêng.
3. PBR textures (base color, normal, metal/roughness, emissive khi cần), LOD hoặc bản mobile nếu asset nặng, poster ảnh tĩnh chất lượng tốt, credit/license lưu nội bộ. Dùng WebP/KTX2 hoặc meshopt **sau khi đo** pipeline/decoder phù hợp; không mặc định copy định dạng của Studio MACACO.
4. Storyboard P7 do chủ sở hữu duyệt: vai trò nhân vật trong portfolio, số shot, tương tác có chủ đích, nội dung EN/VI và điểm nối với P6/P8. Giữ Black Basalt/Bone/Glacier Blue, không bê màu vàng/hệ HUD của reference.

## 6. Hiệu năng và khả năng truy cập

- **[Đề xuất]** Chỉ tải scene khi gần viewport, có poster trước khi WebGL sẵn sàng. Dừng render/update khi khu vực bị bỏ qua hoặc tab ẩn; dùng visibility observer, đo FPS và giới hạn DPR theo tier. `content-visibility` chỉ là tối ưu tùy chọn và phải giữ kích thước dự phòng để tránh layout shift; fallback observer cho trình duyệt cũ. [Three.js WebGLRenderer](https://threejs.org/docs/pages/WebGLRenderer.html).
- **[Đề xuất]** Đặt ngân sách sơ bộ và xác nhận bằng asset thật: so sánh kích thước transfer, triangle count, GPU memory/texture decode, thời gian tải model, FPS desktop/mobile và thời gian main-thread. Model reference chỉ ~2,67 MB tải xuống nhưng ~192k triangles; byte nhỏ **không** đồng nghĩa render nhẹ. Giảm pass/ghost/particles và DPR trước khi giảm chất lượng silhouette của nhân vật.
- **[Đề xuất]** Một renderer/canvas hoạt động cho P7, dọn geometry/material/texture/renderer, listeners, GSAP context và observers khi unmount; xử lý context loss. Có poster tĩnh, keyboard/touch path, giảm chuyển động và không khóa nội dung đằng sau animation. Nếu scene tự động chuyển động liên tục quá 5 giây cạnh nội dung, cần cơ chế pause/stop có thể dùng bằng bàn phím.

## 7. Chưa rõ và blocker

- Quyền/tác giả của mecha trên Studio MACACO và có hay không bản tải được cấp phép: **chưa xác minh; không dùng asset đó cho P7 khi chưa có phép**.
- Asset thay thế của chủ sở hữu, chất lượng rig/animation, source file, license, credit và mobile LOD: chưa có. Đây là blocker chính cho chất lượng cinematic; không chữa bằng robot primitive.
- Chưa có đặc tả P7 được duyệt về câu chuyện, vị trí trên trang, số cảnh, mức độ tương tác và ngân sách hiệu năng. `docs/TASKS.md` hiện vẫn ghi P7 là “Beyond/Playground”; yêu cầu Project Glacier mới cần được chủ sở hữu xác nhận trước khi sửa roadmap/triển khai.
- Không có source map công khai ở sáu bundle mẫu; các chi tiết pipeline, tác giả model, full device tier và phép thử hiệu năng của Studio MACACO không thể khẳng định từ khảo sát này.
- Chưa kiểm thử tương tác thực trên máy/touch của chủ sở hữu; ảnh/quan sát Chrome desktop chỉ chứng minh các trạng thái đã lấy mẫu, không phải toàn bộ motion curve. Playwright/E2E tiếp tục **DEFERRED** đến P11.

**Cổng quyết định:** P7 chỉ bắt đầu sau khi có asset mecha được phép sử dụng và storyboard/roadmap được duyệt. Tài liệu này là khám phá kỹ thuật, không phải phê duyệt sao chép asset hay triển khai P7.
