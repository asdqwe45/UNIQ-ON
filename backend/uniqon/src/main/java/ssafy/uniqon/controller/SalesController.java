package ssafy.uniqon.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.jpa.repository.Query;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ssafy.uniqon.global.response.Response;

import java.time.LocalDateTime;
import java.util.Map;

import static ssafy.uniqon.global.response.Response.OK;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/sales")
@Tag(name = "판매 API")
@CrossOrigin("*")
public class SalesController {

    record RegisterPostWebRequest(
            Integer price,
            String content,
            String title,
            String species,
            String creatureName
    ) {
    }


    @PostMapping("/register")
    public Response<?> registerPost(@RequestBody RegisterPostWebRequest req){
        return OK(null);
    }

    @PutMapping("/update/{postId}")
    public Response<?> updatePost(@PathVariable int postId, Map<String, Integer> price){
        return OK(null);
    }

    @DeleteMapping("/delete/{postId}")
    public Response<?> deletePost(@PathVariable int postId){
        return OK(null);
    }

    @GetMapping("/search/{word}")
    public Response<?> searchPost(@PathVariable String word) {
        return OK(null);
    }

    @GetMapping("/detail/{postId}")
    public Response<?> getDetailPost(@PathVariable int postId){
        return OK(null);
    }
}
