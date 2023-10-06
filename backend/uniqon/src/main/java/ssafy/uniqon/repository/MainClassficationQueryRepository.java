package ssafy.uniqon.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;

import static ssafy.uniqon.model.QMainClassifications.mainClassifications;

@Repository
@RequiredArgsConstructor
@Slf4j
public class MainClassficationQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;

    public record getMainClassficationDBResponse(
            int id,
            String type,
            String image
    ){
        public getMainClassficationDBResponse(int id, String type, String image) {
            this.id = id;
            this.type = type;
            this.image = image;
        }
    }
    public Page<getMainClassficationDBResponse> getMainClassificationList(Pageable pageable){

        List<getMainClassficationDBResponse> list = jpaQueryFactory
                .select(Projections.constructor(getMainClassficationDBResponse.class,
                        mainClassifications.id,
                        mainClassifications.type,
                        mainClassifications.image))
                .from(mainClassifications)
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .orderBy(mainClassifications.id.asc())
                .fetch();

        int count = jpaQueryFactory
                .select(mainClassifications.count())
                .from(mainClassifications)
                .fetch().size();

        return new PageImpl<>(list, pageable, count);
    }

}
